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

var ractive = new Ractive({
  el: '#psipred_site',
  template: '#form_template',
  data: {
          results_visible: 1,
          results_panel_visible: 1,
          psipred_checked: true,
          // disopred_checked: false,
          // memsatsvm_checked: false,

          pgenthreader_checked: false,
          pdomthreader_checked: false,
          dompred_checked: false,
          mempack_checked: false,
          ffpred_checked: false,
          bioserf_checked: false,
          domserf_checked: false,
          //psipred_checked: false,
          download_links: '',
          psipred_job: 'psipred_job',
          //disopred_job: 'disopred_job',
          //memsatsvm_job: 'memsatsvm_job',

          psipred_waiting_message: '<h2>Please wait for your PSIPRED job to process</h2>',
          psipred_waiting_icon: '<object width="140" height="140" type="image/svg+xml" data="http://bioinf.cs.ucl.ac.uk/psipred_beta/static/images/gears.svg"/>',
          psipred_time: 'Unknown',
          psipred_horiz: null,

          // disopred_waiting_message: '<h2>Please wait for your DISOPRED job to process</h2>',
          // disopred_waiting_icon: '<object width="140" height="140" type="image/svg+xml" data="http://bioinf.cs.ucl.ac.uk/psipred_beta/static/images/gears.svg"/>',
          // disopred_time: 'Unknown',
          //
          // memsatsvm_waiting_message: '<h2>Please wait for your MEMSAT_SVM job to process</h2>',
          // memsatsvm_waiting_icon: '<object width="140" height="140" type="image/svg+xml" data="http://bioinf.cs.ucl.ac.uk/psipred_beta/static/images/gears.svg"/>',
          // memsatsvm_time: 'Unknown',

          sequence: '',
          annotations: null,
          email: '',
          name: '',
          psipred_uuid: null,
          //disopred_uuid: null,
          //memsatsvm_uuid: null,
        }
});

if(location.hostname === "127.0.0.1") {
  ractive.set('psipred_waiting_icon', '<object width="140" height="140" type="image/svg+xml" data="../static/images/gears.svg"/>');
  ractive.set('disopred_waiting_icon', '<object width="140" height="140" type="image/svg+xml" data="../static/images/gears.svg"/>');
  ractive.set('memsatsvm_waiting_icon', '<object width="140" height="140" type="image/svg+xml" data="../static/images/gears.svg"/>');
  ractive.set('email', 'daniel.buchan@ucl.ac.uk');
  ractive.set('name', 'test');
  ractive.set('sequence', 'QWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEAS');
}

//4b6ad792-ed1f-11e5-8986-989096c13ee6
let uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let uuid_match = uuid_regex.exec(getUrlVars().psipred_uuid);


///////////////////////////////////////////////////////////////////////////////
//
//
// APPLICATION HERE
//
//
///////////////////////////////////////////////////////////////////////////////

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

//After a job has been sent or a URL accepted this ractive block is called to
//poll the backend to get the results
ractive.once('poll_trigger', function(name, job_type){
  var data_regex = '';
  var image_regex = '';
  var url = submit_url;
  if(job_type === "psipred")
  {
    data_regex = /\.horiz$/;
    image_regex = /\.png$/;
    url += ractive.get('psipred_uuid');
  }
  // if(job_type === "disopred")
  // {
  //   url += ractive.get('disopred_uuid');
  // }
  // if(job_type === "memsatsvm")
  // {
  //   url += ractive.get('memsatsvm_uuid');
  // }

  seq = ractive.get('sequence');
  residues = seq.split('');
  let annotations = [];
  residues.forEach(function(res){
    annotations.push({'res': res});
  });
  ractive.set('annotations', annotations);
  biod3.psipredGrid(ractive.get('annotations'), {parent: 'div.sequence_plot', margin_scaler: 2});

  var interval = setInterval(function(){
    var data = send_request(url, "GET", {});

    //TODO ADAPT THIS FOR DOMPRED AND MEMSATSVM RESULTS
    var downloads_string = ractive.get('download_links');
      for(var k in data){
        if(k == "state"){
          if(data[k] === "Running" || data[k] === "Submitted")
          {
          }
          if(data[k] === 'Complete')
          {
            downloads_string = downloads_string.concat("<h5>PSIPRED DOWNLOADS</h5>");
            results = data.results;
            //console.log(JSON.stringify(results));
            for( var i in results)
            {
              result_dict = results[i];
              if(result_dict.name == 'psipass2')
              {
                var match = data_regex.exec(result_dict.result_data);
                if(match)
                {
                  process_file(result_dict.result_data, true);
                  ractive.set("psipred_waiting_message", '');
                  downloads_string = downloads_string.concat('<a href="'+result_dict.result_data+'">Horiz Format Output</a><br />');
                  ractive.set("psipred_waiting_icon", '');
                  ractive.set("psipred_time", '');
                }
                else {
                  downloads_string = downloads_string.concat('<a href="'+result_dict.result_data+'">SS2 Format Output</a><br />');
                }
              }
              // if(result_dict.name == 'PsipredGS')
              // {
              //   var GSmatch = image_regex.exec(result_dict.result_data);
              //   if(GSmatch)
              //   {
              //     ractive.set("psipred_waiting_message", '<img src='+result_dict.result_data+'>');
              //   }
              // }
            }
            ractive.set('download_links', downloads_string);
            clearInterval(interval);
          }
          if(data[k] === 'Error' || data[k] === 'Crash')
          {
            ractive.set("form_error", data.last_message);
            ractive.set("psipred_waiting_icon", '');
            ractive.set("psipred_waiting_message", "<div style='color:red'>This job terminated with the following error<br />"+ractive.get("form_error")+"<br />Please contact <a href='mailto:psipred@cs.ucl.ac.uk'>psipred@cs.ucl.ac.uk</a> quoting the Analysis ID and error message.</div>");
            clearInterval(interval);
          }
        }
      }
  }, 5000);

},{init: false,
   defer: true
 }
);

// These react to the headers being clicked to toggle the results panel
ractive.on( 'downloads_active', function ( event ) {
  ractive.set( 'results_panel_visible', null );
  ractive.set( 'results_panel_visible', 11 );
});

ractive.on( 'psipred_active', function ( event ) {
  ractive.set( 'results_panel_visible', null );
  ractive.set( 'results_panel_visible', 1 );
  if(ractive.get('psipred_horiz'))
  {
    biod3.psipred(ractive.get('psipred_horiz'), 'psipredChart', {parent: 'div.psipred_cartoon', margin_scaler: 2});
  }
});

// ractive.on( 'disopred_active', function ( event ) {
//   ractive.set( 'results_panel_visible', null );
//   ractive.set( 'results_panel_visible', 4 );
// });
//
// ractive.on( 'memsatsvm_active', function ( event ) {
//   ractive.set( 'results_panel_visible', null );
//   ractive.set( 'results_panel_visible', 6 );
// });

ractive.on('submit', function(event) {
      seq = this.get('sequence');
      seq = seq.replace(/^>.+$/mg, "").toUpperCase();
      seq = seq.replace(/\n|\s/g,"");
      name = this.get('name');
      email = this.get('email');
      psipred_job = this.get('psipred_job');
      psipred_checked = this.get('psipred_checked');
      // disopred_job = this.get('disopred_job');
      // disopred_checked = this.get('disopred_checked');
      // memsatsvm_job = this.get('memsatsvm_job');
      // memsatsvm_checked = this.get('memsatsvm_checked');

      /*verify that everything here is ok*/
      error_message=null;
      //error_message = verify_form(seq, name, email, [psipred_checked, disopred_checked, memsatsvm_checked]);
      error_message = verify_form(seq, name, email, [psipred_checked]);

      if(error_message.length > 0)
      {
        this.set('form_error', error_message);
      }
      else {
        //initialise the page
        let response = true;
        // alert(bio_d3_data);
        ractive.set( 'results_visible', null );
        //Post the jobs and intialise the annotations for each job
        if(psipred_checked === true)
        {
          response = send_job("psipred", this);
        }
        // if(disopred_checked === true)
        // {
        //   response = send_job("disopred", this);
        //   ann = [];
        //   //initialise the ss annotations as just coil
        //   for(let i = 0; i < seq.length; i++)
        //   {
        //     ann.push("ORDERED");
        //   }
        //   //bio_d3_data = biod3.add_annotation(bio_d3_data, ann, "disorder");
        // }
        // if(memsatsvm_checked === true)
        // {
        //   response = send_job("memsatsvm", this);
        //   ann = [];
        //   //initialise the ss annotations as just coil
        //   for(let i = 0; i < seq.length; i++)
        //   {
        //     ann.push("INTRACELLULAR");
        //   }
        //   // bio_d3_data = biod3.add_annotation(bio_d3_data, ann, "MEMBRANE");
        // }

        //set visibility and render panel once
        if (psipred_checked === true && response)
        {
          ractive.set( 'results_visible', 2 );
          ractive.fire( 'psipred_active' );
          // parse sequence and make seq plot
        }
        // else if(disopred_checked === true && response)
        // {
        //   ractive.set( 'results_visible', 2 );
        //   ractive.fire( 'disopred_active' );
        //   //this_panel = biod3.bio_panel(bio_d3_data, 50, "sequence_plot", {topX : true, bottomX: true, leftY: true, rightY: true, cellClass: "disorder", labelled_axes: false, annotation_selector: true, panel_name: "this_panel", data_name: "bio_d3_data"});
        //   // try{
        //   // this_panel.render(bio_d3_data, "disorder");}
        //   // catch(err){alert(err.message)}
        // }
        // else if(memsatsvm_checked === true && response)
        // {
        //   ractive.set( 'results_visible', 2 );
        //   ractive.fire( 'memsatsvm_active' );
        //   //this_panel = biod3.bio_panel(bio_d3_data, 50, "sequence_plot", {topX : true, bottomX: true, leftY: true, rightY: true, cellClass: "disorder", labelled_axes: false, annotation_selector: true, panel_name: "this_panel", data_name: "bio_d3_data"});
        //   // try{
        //   // this_panel.render(bio_d3_data, "disorder");}
        //   // catch(err){alert(err.message)}
        // }
        if(! response){window.location.href = window.location.href;}
      }
    //alert("huh");

    event.original.preventDefault();
});


// Here having set up ractive and the functions we need we then check
// if we were provided a UUID, if yes then we display those results
// Or go back to polling
//
//TODO: Handle loading that page with use the MEMSAT and DISOPRED UUID
//
if(getUrlVars()["psipred_uuid"] && uuid_match)
{
  ractive.set('results_visible', null );
  ractive.set('results_visible', 2 );
  ractive.set("psipred_uuid", getUrlVars()["psipred_uuid"]);
  ractive.set('sequence',get_previous_seq(getUrlVars()["psipred_uuid"]));

  seq = ractive.get('sequence');

  ractive.fire('poll_trigger', 'psipred');
}



///////////////////////////////////////////////////////////////////////////////
//
//
// HELPER FUNCTIONS
//
//
///////////////////////////////////////////////////////////////////////////////


function get_previous_seq(uuid)
{
    url = submit_url+ractive.get('psipred_uuid');
    var submission_response = send_request(url, "GET", {});
    if(! submission_response){alert("NO SUBMISSION DATA");}
    var data = get_text(submission_response.input_data, "GET", {});
    return(data);
}

function process_file(url, psipred_ctl)
{
  //get a results file and push the data in to the bio3d object
  //alert(url);
  //alert(psipred_ctl);
  //alert(getEmPixels());
  var response = null;
  $.ajax({
    type: 'GET',
    async:   true,
    url: url,
    success : function (file)
    {
      if(psipred_ctl === true)
      {
        ractive.set('psipred_horiz', file);
        biod3.psipred(file, 'psipredChart', {parent: 'div.psipred_cartoon', margin_scaler: 2});
      }
      //ractive.set('waiting', file.responseText);
    },
    error: function (error) {alert(JSON.stringify(error));}
  });
}

//get text contents of a result
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
    error: function (error) {alert("Gettings results failed. The Backend processing service is not available. Something Catastrophic has gone wrong. Please contact psipred@cs.ucl.ac.uk");}
  });
  return(response);
}


//given a job name prep all the form elements and send an http request to the
//backend
function send_job(job_name, ractive_instance)
{
  var file = null;
  upper_name = job_name.toUpperCase();
  try
  {
    file = new File([seq], 'input.txt');
  } catch (e)
  {
    alert(e);
  }
  let fd = new FormData();
  fd.append("input_data", file);
  fd.append("job",job_name);
  fd.append("submission_name",name);
  fd.append("email",email);
  // if(job_name === 'psipred')
  // {
  //   fd.append("task1_all", true);
  //   fd.append("task2_number", 12);
  // }
  if(job_name === 'disopred')
  {
    // ADD PARAM SETTINGS TO FORM IF NEEDED
  }
  let response_data = send_request(submit_url, "POST", fd);
  if(response_data !== null)
  {
    times = send_request(times_url,'GET',{});
    if(job_name in times)
    {
      ractive_instance.set(job_name+'_time', upper_name+" jobs typically take "+times[job_name]+" seconds");
    }
    else
    {
      ractive_instance.set(job_name+'_time', "Unable to retrieve average time for "+upper_name+" jobs.");
    }
    for(var k in response_data)
    {
      if(k == "UUID")
      {
        ractive_instance.set(job_name+'_uuid', response_data[k]);
        //alert(job_name);
        ractive.fire('poll_trigger', job_name);
      }
    }
  }
  else
  {
    return null;
  }
  return true;
}

//given a url, http request type and some form data make an http request
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
    error: function (error) {alert("Sending Job to "+url+" Failed. "+error.responseText+". The Backend processing service is not available. Something Catastrophic has gone wrong. Please contact psipred@cs.ucl.ac.uk"); return null;}
  }).responseJSON;
  return(response);
}


//Takes the form elements and checks they are valid
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

//guven and array return whether and element is present
function isInArray(value, array) {
  if(array.indexOf(value) > -1)
  {
    return(true);
  }
  else {
    return(false);
  }
}

//given a URL return the attached variables
function getUrlVars() {
    var vars = {};
    //consider using location.search instead here
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

/*! getEmPixels  | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT */
(function (document, documentElement) {
    // Enable strict mode
    "use strict";

    // Form the style on the fly to result in smaller minified file
    var important = "!important;";
    var style = "position:absolute" + important + "visibility:hidden" + important + "width:1em" + important + "font-size:1em" + important + "padding:0" + important;

    window.getEmPixels = function (element) {

        var extraBody;

        if (!element) {
            // Emulate the documentElement to get rem value (documentElement does not work in IE6-7)
            element = extraBody = document.createElement("body");
            extraBody.style.cssText = "font-size:1em" + important;
            documentElement.insertBefore(extraBody, document.body);
        }

        // Create and style a test element
        var testElement = document.createElement("i");
        testElement.style.cssText = style;
        element.appendChild(testElement);

        // Get the client width of the test element
        var value = testElement.clientWidth;

        if (extraBody) {
            // Remove the extra body element
            documentElement.removeChild(extraBody);
        }
        else {
            // Remove the test element
            element.removeChild(testElement);
        }

        // Return the em value in pixels
        return value;
    };
}(document, document.documentElement));
