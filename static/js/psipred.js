/* 1. Catch form input
     2. Verify form
     3. If good then make file from data and pass to backend
     4. shrink form away
     5. Open seq panel
     6. Show processing animation
     7. listen for result
*/

var ractive = new Ractive({
  el: '#psipred_site',
  template: '#form_template',
  data: { sequence: '',
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
  regex = /^>(.+?)\s/
  match = regex.exec(newValue)
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
 })

ractive.observe('uuid', function(newValue, oldValue){
  var psipred_recieved = false
  while(psipred_recieved != true)
   {
     setTimeout(function(){alert("waiting")},2000)
     //call the server for a repsonse
     //if finished then write results and set psipred_recieved to true
     //else stay in the loop
     break
   }

},{init: false,
   defer: true
 }
)

ractive.on('submit', function(event) {
      seq = this.get('sequence')
      seq = seq.replace(/^>.+$/mg, "").toUpperCase()
      seq = seq.replace(/\n|\s/g,"")
      name = this.get('name')
      email = this.get('email')
      psipred_job = this.get('psipred_job')
      psipred_checked = this.get('psipred_checked')
      /*verify that everything here is ok*/
      error_message=null
      error_message = verify_form(seq, job_name, email, [psipred_checked])

      if(error_message.length > 0)
      (
        this.set('form_error', error_message)
      )
      else {
        ractive.set( 'visible', null );
        ractive.set( 'visible', 2 );
        var job_name = "nada"
        if(psipred_checked === true)
        {
          job_name = "psipred"
        }

        endpoints_url = 'http://127.0.0.1:8000/analytics_automated/endpoints/'
        submit_url = 'http://127.0.0.1:8000/analytics_automated/submission/'
        try {
          var file = new File([seq], 'input.txt');
        } catch (e) {
          alert(e)
        }

        var fd = new FormData();
        fd.append("input_data", file)
        fd.append("job",job_name)
        fd.append("submission_name",name)
        fd.append("email",email)
        fd.append("task1_all", true)
        fd.append("task2_number", 12)

        var response = send_request(submit_url, "POST", fd)
        data = JSON.parse(response)
        for(var k in data){
          if(k == "UUID"){
            this.set('uuid', data[k])
          }
        }
      }
    event.original.preventDefault()
})

function send_request(url, type, send_data)
{
  if(type == "GET"){

  }

  var response = ''
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
      if(data == null){alert("Failed to send data")}
      response=data.responseText;
      //alert(JSON.stringify(response, null, 2))
    },
    error: function (error) {alert(JSON.stringify(error))}
  }).responseJSON

  return(response);
}

function verify_form(seq, job_name, email, checked_array )
{
  error_message = ""
  if(! /^[\x00-\x7F]+$/.test(job_name))
  {
    error_message = error_message + "Please restrict Job Names to valid letters numbers and basic punctuation<br />"
  }

  /* length checks */
  if(seq.length > 1500)
  {
    error_message = error_message + "Your sequence is too long to process<br />"
  }
  if(seq.length < 30)
  {
    error_message = error_message + "Your sequence is too short to process<br />"
  }

  /* nucleotide checks */
  nucleotide_count = (seq.match(/A|T|C|G|U|N|a|t|c|g|u|n/g)||[]).length
  if((nucleotide_count/seq.length) > 0.95)
  {
    error_message = error_message + "Your sequence appears to be nucleotide sequence. This service requires protein sequence as input<br />"
  }
  if(/[^ACDEFGHIKLMNPQRSTVWYX_-]+/i.test(seq))
  {
    error_message = error_message + "Your sequence contains invalid characters<br />"
  }

  if(isInArray(true, checked_array) === false) {
    error_message = error_message + "You must select at least one analysis program"
  }
  return(error_message)
};

function isInArray(value, array) {
  if(array.indexOf(value) > -1)
  {
    return(true);
  }
  else {
    return(false);
  }
};

/* ractive.on({
    process_form: function ( event, which ) {
      ractive.set( 'visible', null ).then( function () {
        ractive.set( 'visible', which );
        ractive.set( 'visible', 3 );

      });
    }
  });
*/
