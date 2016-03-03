/* 1. Catch form input
     2. Verify form
     3. If good then make file from data and pass to backend
     4. shrink form away
     5. Open seq panel
     6. Show processing animation
     7. listen for result
*/
var endpoints_url = 'http://127.0.0.1:8000/analytics_automated/endpoints/';
var submit_url = 'http://127.0.0.1:8000/analytics_automated/submission/';

var bio_d3_data = null;
var this_panel = null;

var ractive = new Ractive({
  el: '#psipred_site',
  template: '#form_template',
  data: {
          visible: 1,
          psipred_checked: true,
          //psipred_checked: false,
          psipred_job: 'psipred_job',
          waiting: 'Please wait for your job to process',
          sequence: "asdasdasdasdasdasdasdasdasdasdasdasdasdasda",
          email: 'daniel.buchan@ucl.ac.uk',
          name: 'test',
          uuid: null,
        }
});


ractive.observe('sequence', function(newValue, oldValue ) {
  regex = /^>(.+?)\s/;
  match = regex.exec(newValue);
  if(match)
  {
    this.set('name', match[1]);
  }
  else {
    this.set('name', null);
  }

  },
  {init: false,
   defer: true
 });

ractive.once('poll_trigger', function(){
   var regex = /\.horiz$/;

   var interval = setInterval(function(){
      url = 'http://127.0.0.1:8000/analytics_automated/submission/'+ractive.get('uuid');
      var response = send_request(url, "GET", {});
      data = JSON.parse(response);
      for(var k in data){
        if(k == "state"){
          if(data[k] == "Running" || data[k] == "Submitted")
          {
          }
          if(data[k] == 'Complete')
          {
            results = data['results'];
            for( var i in results)
            {
              result_dict = results[i];
              if(result_dict['name'] == 'psipass2' )
              {
                var match = regex.exec(result_dict['result_data'])
                if(match)
                {
                  process_file(result_dict['result_data'], true);
                  ractive.set("waiting", data['last_message']);
                }
              }
            }
            clearInterval(interval);
          }
          if(data[k] == 'Error' || data[k] == 'Crash')
          {
            ractive.set("form_error", data['last_message'])
            clearInterval(interval)
          }
        }
      }
    }, 2000);

},{init: false,
   defer: true
 }
);

ractive.on('submit', function(event) {
      seq = this.get('sequence');
      seq = seq.replace(/^>.+$/mg, "").toUpperCase();
      seq = seq.replace(/\n|\s/g,"");
      name = this.get('name');
      email = this.get('email');
      psipred_job = this.get('psipred_job');
      psipred_checked = this.get('psipred_checked');
      /*verify that everything here is ok*/
      error_message=null;
      error_message = verify_form(seq, name, email, [psipred_checked]);
      if(error_message.length > 0)
      {
        this.set('form_error', error_message);
      }
      else {

        ractive.set( 'visible', null );
        ractive.set( 'visible', 2 );

        bio_d3_data = biod3.process_sequence_string(seq);
        ann = ["C","C","C","C","C","C","C","C","C","C",
               "C","C","C","C","C","C","C","C","C","C",
               "C","C","C","C","C","C","C","C","C","C",
               "C","C","C","C","C","C","C","C","C","C",
               "C","C","C"];

        bio_d3_data = biod3.add_annotation(bio_d3_data, ann, "ss");
        this_panel = biod3.bio_panel(bio_d3_data, 50, "sequence_plot", {topX : true, bottomX: true, leftY: true, rightY: true, cellClass: "ss", labelled_axes: false, annotation_selector: true, panel_name: "this_panel", data_name: "bio_d3_data"});
        this_panel.render(bio_d3_data, "ss");

        var job_name = "nada";
        if(psipred_checked === true)
        {
          job_name = "psipred";
        }
        var file = null;
        try {
          file = new File([seq], 'input.txt');
        } catch (e) {
          alert(e);
        }

        var fd = new FormData();
        fd.append("input_data", file);
        fd.append("job",job_name);
        fd.append("submission_name",name);
        fd.append("email",email);
        fd.append("task1_all", true);
        fd.append("task2_number", 12);

        var response = send_request(submit_url, "POST", fd);
        data = JSON.parse(response);
        for(var k in data){
          if(k == "UUID"){
            this.set('uuid', data[k]);
            ractive.fire('poll_trigger');
          }
        }
      }
    event.original.preventDefault();
});

function process_file(url, psipred_ctl)
{
  var response = '';
  $.ajax({
    type: 'GET',
    async:   true,
    url: url,
    complete : function (file)
    {
      if(psipred_ctl === true)
      {
        text = file.responseText;
        var lines= text.split('\n');
        var prediction = [];
        for(var i = 0; i < lines.length; i++)
        {
          if(lines[i].substring(0,6) === "Pred: ")
          {
            var predict_string = lines[i].substring(6, lines[i].length);
            var chars = predict_string.split('');
            prediction.push.apply(prediction, chars);
            console.log(prediction);
          }
        }
        bio_d3_data = biod3.add_annotation(bio_d3_data, prediction, "ss");
        this_panel.render(bio_d3_data, "ss");
      }
      ractive.set('waiting', file.responseText);
    },
    error: function (error) {alert(JSON.stringify(error));}
  });
}

function send_request(url, type, send_data)
{
  var response = '';
  $.ajax({
    type: type,
    data: send_data,
    cache: false,
    contentType: false,
    processData: false,
    async:   false,
    dataType: "json",
    //contentType: "application/json",
    url: url,
    complete : function (data)
    {
      if(data === null){alert("Failed to send data");}
      response=data.responseText;
      //alert(JSON.stringify(response, null, 2))
    },
    error: function (error) {alert(JSON.stringify(error));}
  }).responseJSON
  return(response);
}

function verify_form(seq, job_name, email, checked_array )
{
  error_message = "";
  if(! /^[\x00-\x7F]+$/.test(job_name))
  {
    error_message = error_message + "Please restrict Job Names to valid letters numbers and basic punctuation<br />";
  }

  /* length checks */
  if(seq.length > 1500)
  {
    error_message = error_message + "Your sequence is too long to process<br />";
  }
  if(seq.length < 30)
  {
    error_message = error_message + "Your sequence is too short to process<br />";
  }

  /* nucleotide checks */
  nucleotide_count = (seq.match(/A|T|C|G|U|N|a|t|c|g|u|n/g)||[]).length;
  if((nucleotide_count/seq.length) > 0.95)
  {
    error_message = error_message + "Your sequence appears to be nucleotide sequence. This service requires protein sequence as input<br />";
  }
  if(/[^ACDEFGHIKLMNPQRSTVWYX_-]+/i.test(seq))
  {
    error_message = error_message + "Your sequence contains invalid characters<br />";
  }

  if(isInArray(true, checked_array) === false) {
    error_message = error_message + "You must select at least one analysis program";
  }
  return(error_message);
}

function isInArray(value, array) {
  if(array.indexOf(value) > -1)
  {
    return(true);
  }
  else {
    return(false);
  }
}
/* ractive.on({
    process_form: function ( event, which ) {
      ractive.set( 'visible', null ).then( function () {
        ractive.set( 'visible', which );
        ractive.set( 'visible', 3 );
      });
    }
  });
*/
