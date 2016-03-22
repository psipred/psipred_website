/* 1. Catch form input
     2. Verify form
     3. If good then make file from data and pass to backend
     4. shrink form away
     5. Open seq panel
     6. Show processing animation
     7. listen for result
*/

// SET ENDPOINTS FOR DEV, STAGING OR PROD
var endpoints_url = null;
var submit_url = null;
var times_url = null;
if(location.hostname === "127.0.0.1" || location.hostname === "localhost")
{
  endpoints_url = 'http://127.0.0.1:8000/analytics_automated/endpoints/';
  submit_url = 'http://127.0.0.1:8000/analytics_automated/submission/';
  times_url = 'http://127.0.0.1:8000/analytics_automated/jobtimes/';
}
else if(location.hostname === "bioinfstage1.cs.ucl.ac.uk" || location.href  === "http://bioinf.cs.ucl.ac.uk/psipred_beta/") {
  endpoints_url = 'http://bioinf.cs.ucl.ac.uk/psipred_beta/api/endpoints/';
  submit_url = 'http://bioinf.cs.ucl.ac.uk/psipred_beta/api/submission/';
  times_url = 'http://bioinf.cs.ucl.ac.uk/psipred_beta/api/jobtimes';
}
else {
  endpoints_url = '';
  submit_url = '';
  times_url = '';
}

// DECLARE VARIABLES
var bio_d3_data = null;
var this_panel = null;

var ractive = new Ractive({
  el: '#psipred_site',
  template: '#form_template',
  data: {
          results_visible: 1,
          results_panel_visible: 1,
          psipred_checked: true,
          pgenthreader_checked: false,
          pdomthreader_checked: false,
          disopred_checked: false,
          dompred_checked: false,
          memsatsvm_checked: false,
          mempack_checked: false,
          ffpred_checked: false,
          bioserf_checked: false,
          domserf_checked: false,
          //psipred_checked: false,
          download_links: '',
          psipred_job: 'psipred_job',
          disopred_job: 'disopred_job',
          psipred_waiting_message: '<h2>Please wait for your PSIPRED job to process</h2>',
          psipred_waiting_icon: '<object width="140" height="140" type="image/svg+xml" data="http://bioinf.cs.ucl.ac.uk/psipred_beta/static/images/gears.svg"/>',
          psipred_time: 'Unknown',

          disopred_waiting_message: '<h2>Please wait for your DISOPRED job to process</h2>',
          disopred_waiting_icon: '<object width="140" height="140" type="image/svg+xml" data="http://bioinf.cs.ucl.ac.uk/psipred_beta/static/images/gears.svg"/>',
          disopred_time: 'Unknown',

          sequence: '',
          email: '',
          name: '',
          psipred_uuid: null,
          disopred_uuid: null,
        }
});

if(location.hostname === "127.0.0.1") {
  ractive.set('psipred_waiting_icon', '<object width="140" height="140" type="image/svg+xml" data="../static/images/gears.svg"/>');
  ractive.set('disopred_waiting_icon', '<object width="140" height="140" type="image/svg+xml" data="../static/images/gears.svg"/>');
  ractive.set('email', 'daniel.buchan@ucl.ac.uk');
  ractive.set('name', 'test');
  ractive.set('sequence', 'QWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEAS');
}
//4b6ad792-ed1f-11e5-8986-989096c13ee6
uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
uuid_match = uuid_regex.exec(getUrlVars()["psipred_uuid"]);

//APPLICATION FROM HERE
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

ractive.once('poll_trigger', function(job_type){
  //alert(job_type);
  var regex = /\.horiz$/;
  var regex = '';

  if(job_type === "psipred")
  {
    regex = /\.horiz$/;
  }

  var interval = setInterval(function(){
  url = submit_url+ractive.get('psipred_uuid');
  var data = send_request(url, "GET", {});
  //console.log(data);

  var downloads_string = ractive.get('download_links');
    for(var k in data){
      if(k == "state"){
        if(data[k] === "Running" || data[k] === "Submitted")
        {
        }
        if(data[k] === 'Complete')
        {
          downloads_string = downloads_string.concat("<h5>PSIPRED DOWNLOADS</h5>");
          results = data['results'];
          for( var i in results)
          {
            result_dict = results[i];
            if(result_dict['name'] == 'psipass2')
            {
              var match = regex.exec(result_dict['result_data'])
              if(match)
              {
                process_file(result_dict['result_data'], true);
                ractive.set("psipred_waiting_message", '<h2>This PSIPRED Job Has Completed</h2>');
                downloads_string = downloads_string.concat('<a href="'+result_dict['result_data']+'">Horiz Format Output</a><br />');
                ractive.set("psipred_waiting_icon", '');
                ractive.set("psipred_time", '')
              }
              else {
                downloads_string = downloads_string.concat('<a href="'+result_dict['result_data']+'">SS2 Format Output</a><br />');
              }
            }
          }
          ractive.set('download_links', downloads_string);
          clearInterval(interval);
        }
        if(data[k] === 'Error' || data[k] === 'Crash')
        {
          ractive.set("form_error", data['last_message'])
          ractive.set("psipred_waiting_icon", '');
          ractive.set("psipred_waiting_message", "<div style='color:red'>This job terminated with the following error<br />"+ractive.get("form_error")+"<br />Please contact <a href='mailto:psipred@cs.ucl.ac.uk'>psipred@cs.ucl.ac.uk</a> quoting the Analysis ID and error message.</div>");
          clearInterval(interval)
        }
      }
    }
  }, 5000);

},{init: false,
   defer: true
 }
);

ractive.on( 'downloads_active', function ( event ) {
  ractive.set( 'results_panel_visible', null );
  ractive.set( 'results_panel_visible', 11 );
});

ractive.on( 'psipred_active', function ( event ) {
  ractive.set( 'results_panel_visible', null );
  ractive.set( 'results_panel_visible', 1 );
});

ractive.on( 'disopred_active', function ( event ) {
  ractive.set( 'results_panel_visible', null );
  ractive.set( 'results_panel_visible', 4 );
});


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

        var psipred_data = send_request(submit_url, "POST", fd);
        if(psipred_data !== null)
        {
          ractive.set( 'results_visible', null );
          ractive.set( 'results_visible', 2 );

          bio_d3_data = biod3.process_sequence_string(seq);
          ann = [];
          //initialise the ss annotations as just coil
          for(var i = 0; i < seq.length; i++)
          {
            ann.push("C");
          }
          bio_d3_data = biod3.add_annotation(bio_d3_data, ann, "ss");
          this_panel = biod3.bio_panel(bio_d3_data, 50, "sequence_plot", {topX : true, bottomX: true, leftY: true, rightY: true, cellClass: "ss", labelled_axes: false, annotation_selector: true, panel_name: "this_panel", data_name: "bio_d3_data"});
          this_panel.render(bio_d3_data, "ss");

          times = send_request(times_url,'GET',{});
          if("psipred" in times)
          {
            console.log(times.psipred);
            this.set('psipred_time', "PISPRED jobs typically take "+times.psipred+" seconds");
          }
          else {
            this.set('psipred_time', "Unable to retrieve average time for PSIPRED jobs.");
          }

          for(var k in psipred_data){
          if(k == "UUID"){
            this.set('psipred_uuid', psipred_data[k]);
            ractive.fire('poll_trigger', 'psipred');
          }
        }
        }
      }
    event.original.preventDefault();
});

// Here having set up ractive and the functions we need we then check
// if we were provided a UUID, if yes then we display those results
// Or go back to polling
if(getUrlVars()["psipred_uuid"] && uuid_match)
{
  ractive.set('results_visible', null );
  ractive.set('results_visible', 2 );
  ractive.set("psipred_uuid", getUrlVars()["psipred_uuid"]);
  ractive.set('sequence',get_previous_seq(getUrlVars()["psipred_uuid"]));

  seq = ractive.get('sequence');
  bio_d3_data = biod3.process_sequence_string(seq);
  ann = [];
  //initialise the ss annotations as just coil
  for(var i = 0; i < seq.length; i++)
  {
    ann.push("C");
  }
  bio_d3_data = biod3.add_annotation(bio_d3_data, ann, "ss");
  this_panel = biod3.bio_panel(bio_d3_data, 50, "sequence_plot", {topX : true, bottomX: true, leftY: true, rightY: true, cellClass: "ss", labelled_axes: false, annotation_selector: true, panel_name: "this_panel", data_name: "bio_d3_data"});
  this_panel.render(bio_d3_data, "ss");

  ractive.fire('poll_trigger');
}

function get_previous_seq(uuid)
{
    url = submit_url+ractive.get('psipred_uuid');
    var submission_response = send_request(url, "GET", {});
    var data = get_text(submission_response.input_data, "GET", {});
    return(data);
}

//
// HELPER FUNCTIONS BELOW HERE
//
function process_file(url, psipred_ctl)
{
  //alert(url);
  var response = null;
  $.ajax({
    type: 'GET',
    async:   true,
    url: url,
    success : function (file)
    {
      if(psipred_ctl === true)
      {
        text = file;
        var lines= text.split('\n');
        var prediction = [];
        for(var i = 0; i < lines.length; i++)
        {
          if(lines[i].substring(0,6) === "Pred: ")
          {
            var predict_string = lines[i].substring(6, lines[i].length);
            var chars = predict_string.split('');
            prediction.push.apply(prediction, chars);
            //console.log(prediction);
          }
        }
        bio_d3_data = biod3.add_annotation(bio_d3_data, prediction, "ss");
        this_panel.render(bio_d3_data, "ss");
      }
      //ractive.set('waiting', file.responseText);
    },
    error: function (error) {alert(JSON.stringify(error));}
  });
}

function get_text(url, type, send_data)
{
  var response = null;
  $.ajax({
    type: type,
    data: send_data,
    cache: false,
    contentType: false,
    processData: false,
    async:   false,
    //dataType: "txt",
    //contentType: "application/json",
    url: url,
    success : function (data)
    {
      if(data === null){alert("Failed to request input data text");}
      response=data;
      //alert(JSON.stringify(response, null, 2))
    },
    error: function (error) {alert("The Backend processing service is not available. Something Catastrophic has gone wrong. Please contact psipred@cs.ucl.ac.uk");}
  });
  return(response);
}

function send_request(url, type, send_data)
{
  var response = null;
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
    success : function (data)
    {
      if(data === null){alert("Failed to send data");}
      response=data;
      //alert(JSON.stringify(response, null, 2))
    },
    error: function (error) {alert("The Backend processing service is not available. Something Catastrophic has gone wrong. Please contact psipred@cs.ucl.ac.uk");}
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

function getUrlVars() {
    var vars = {};
    //consider using location.search instead here
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
