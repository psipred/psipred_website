/* 1. Catch form input
     2. Verify form
     3. If good then make file from data and pass to backend
     4. shrink form away
     5. Open seq panel
     6. Show processing animation
     7. listen for result
*/

var clipboard = new Clipboard('.copyButton');
var zip = new JSZip();

clipboard.on('success', function(e) {
    console.log(e);
});
clipboard.on('error', function(e) {
    console.log(e);
});

// SET ENDPOINTS FOR DEV, STAGING OR PROD
let endpoints_url = null;
let submit_url = null;
let times_url = null;
let gears_svg = "http://bioinf.cs.ucl.ac.uk/psipred_beta/static/images/gears.svg";
let main_url = "http://bioinf.cs.ucl.ac.uk";
let app_path = "/psipred_beta";

if(location.hostname === "127.0.0.1" || location.hostname === "localhost")
{
  endpoints_url = 'http://127.0.0.1:8000/analytics_automated/endpoints/';
  submit_url = 'http://127.0.0.1:8000/analytics_automated/submission/';
  times_url = 'http://127.0.0.1:8000/analytics_automated/jobtimes/';
  app_path = '/interface';
  main_url = 'http://127.0.0.1:8000';
  gears_svg = "../static/images/gears.svg";
  file_url = main_url;
}
else if(location.hostname === "bioinfstage1.cs.ucl.ac.uk" || location.hostname  === "bioinf.cs.ucl.ac.uk" || location.href  === "http://bioinf.cs.ucl.ac.uk/psipred_beta/") {
  endpoints_url = main_url+app_path+'/api/endpoints/';
  submit_url = main_url+app_path+'/api/submission/';
  times_url = main_url+app_path+'/api/jobtimes/';
  file_url = main_url+app_path+"/api";
  //gears_svg = "../static/images/gears.svg";
}
else {
  alert('UNSETTING ENDPOINTS WARNING, WARNING!');
  endpoints_url = '';
  submit_url = '';
  times_url = '';
}


// DECLARE VARIABLES and init ractive instance

var ractive = new Ractive({
  el: '#psipred_site',
  template: '#form_template',
  data: {
          results_visible: 1,
          results_panel_visible: 1,
          psipred_checked: false,
          psipred_button: false,
          submission_widget_visible: 0,
          disopred_checked: false,
          disopred_button: false,
          memsatsvm_checked: true,
          memsatsvm_button: false,

          // pgenthreader_checked: false,
          // pdomthreader_checked: false,
          // dompred_checked: false,
          // mempack_checked: false,
          // ffpred_checked: false,
          // bioserf_checked: false,
          // domserf_checked: false,
          download_links: '',
          psipred_job: 'psipred_job',
          disopred_job: 'disopred_job',
          memsatsvm_job: 'memsatsvm_job',

          psipred_waiting_message: '<h2>Please wait for your PSIPRED job to process</h2>',
          psipred_waiting_icon: '<object width="140" height="140" type="image/svg+xml" data="'+gears_svg+'"/>',
          psipred_time: 'Loading Data',
          psipred_horiz: null,

          disopred_waiting_message: '<h2>Please wait for your DISOPRED job to process</h2>',
          disopred_waiting_icon: '<object width="140" height="140" type="image/svg+xml" data="'+gears_svg+'"/>',
          disopred_time: 'Loading Data',
          diso_precision: null,

          memsatsvm_waiting_message: '<h2>Please wait for your MEMSAT-SVM job to process</h2>',
          memsatsvm_waiting_icon: '<object width="140" height="140" type="image/svg+xml" data="http://bioinf.cs.ucl.ac.uk/psipred_beta/static/images/gears.svg"/>',
          memsatsvm_time: 'Unknown',

          // Sequence and job info
          sequence: '',
          sequence_length: 1,
          subsequence_start: 1,
          subsequence_stop: 1,
          email: '',
          name: '',
          batch_uuid: null,

          //hold annotations that are read from datafiles
          annotations: null,
        }
});

if(location.hostname === "127.0.0.1") {
  ractive.set('email', 'daniel.buchan@ucl.ac.uk');
  ractive.set('name', 'test');
  ractive.set('sequence', 'QWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEASDQWEAS');
}

//4b6ad792-ed1f-11e5-8986-989096c13ee6
let uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let uuid_match = uuid_regex.exec(getUrlVars().uuid);

///////////////////////////////////////////////////////////////////////////////
//
//
// APPLICATION HERE
//
//
///////////////////////////////////////////////////////////////////////////////

//Here were keep an eye on some form elements and rewrite the name if people
//have provided a fasta formatted seq
let seq_observer = ractive.observe('sequence', function(newValue, oldValue ) {
  let regex = /^>(.+?)\s/;
  let match = regex.exec(newValue);
  if(match)
  {
    this.set('name', match[1]);
  }
  // else {
  //   this.set('name', null);
  // }

  },
  {init: false,
   defer: true
 });

//theses two observers stop people setting the resubmission widget out of bounds
ractive.observe( 'subsequence_stop', function ( value ) {
  let seq_length = ractive.get('sequence_length');
  let seq_start = ractive.get('subsequence_start');
  if(value > seq_length)
  {
    ractive.set('subsequence_stop', seq_length);
  }
  if(value <= seq_start)
  {
    ractive.set('subsequence_stop', seq_start+1);
  }
});
ractive.observe( 'subsequence_start', function ( value ) {
  let seq_stop = ractive.get('subsequence_stop');
  if(value < 1)
  {
    ractive.set('subsequence_start', 1);
  }
  if(value >= seq_stop)
  {
    ractive.set('subsequence_start', seq_stop-1);
  }
});

//After a job has been sent or a URL accepted this ractive block is called to
//poll the backend to get the results
ractive.on('poll_trigger', function(name, job_type){
  console.log("Polling backend for results");
  let horiz_regex = /\.horiz$/;
  let ss2_regex = /\.ss2$/;
  let image_regex = '';
  let url = submit_url + ractive.get('batch_uuid');
  history.pushState(null, '', app_path+'/&uuid='+ractive.get('batch_uuid'));

  draw_empty_annotation_panel();

  let interval = setInterval(function(){
    let batch = send_request(url, "GET", {});
    let downloads_info = {};

    if(batch.state === 'Complete')
    {
      console.log("Render results");
      let submissions = batch.submissions;
      submissions.forEach(function(data){
          console.log(data);
          if(data.job_name.includes('psipred'))
          {
            downloads_info.psipred = {};
            downloads_info.psipred.header = "<h5>PSIPRED DOWNLOADS</h5>";
          }
          if(data.job_name.includes('disopred'))
          {
            downloads_info.disopred = {};
            downloads_info.disopred.header = "<h5>DISOPRED DOWNLOADS</h5>";
          }
          let results = data.results;
          for(var i in results)
          {
            let result_dict = results[i];
            //psipred files
            if(result_dict.name == 'psipass2')
            {
              let match = horiz_regex.exec(result_dict.data_path);
              if(match)
              {
                process_file(file_url, result_dict.data_path, 'horiz');
                ractive.set("psipred_waiting_message", '');
                downloads_info.psipred.horiz = '<a href="'+file_url+result_dict.data_path+'">Horiz Format Output</a><br />';
                ractive.set("psipred_waiting_icon", '');
                ractive.set("psipred_time", '');
              }
              let ss2_match = ss2_regex.exec(result_dict.data_path);
              if(ss2_match)
              {
                downloads_info.psipred.ss2 = '<a href="'+file_url+result_dict.data_path+'">SS2 Format Output</a><br />';
                process_file(file_url, result_dict.data_path, 'ss2');
              }
            }
            //disopred files
            if(result_dict.name === 'diso_format')
            {
              process_file(file_url, result_dict.data_path, 'pbdat');
              ractive.set("disopred_waiting_message", '');
              downloads_info.disopred.pbdat = '<a href="'+file_url+result_dict.data_path+'">PBDAT Format Output</a><br />';
              ractive.set("disopred_waiting_icon", '');
              ractive.set("disopred_time", '');
            }
            if(result_dict.name === 'diso_combine')
            {
              process_file(file_url, result_dict.data_path, 'comb');
              downloads_info.disopred.comb = '<a href="'+file_url+result_dict.data_path+'">COMB NN Output</a><br />';
            }
          }

      });
      let downloads_string = ractive.get('download_links');
      if('psipred' in downloads_info)
      {
        downloads_string = downloads_string.concat(downloads_info.psipred.header);
        downloads_string = downloads_string.concat(downloads_info.psipred.horiz);
        downloads_string = downloads_string.concat(downloads_info.psipred.ss2);
        downloads_string = downloads_string.concat("<br />");
      }
      if('disopred' in downloads_info)
      {
        downloads_string = downloads_string.concat(downloads_info.disopred.header);
        downloads_string = downloads_string.concat(downloads_info.disopred.pbdat);
        downloads_string = downloads_string.concat(downloads_info.disopred.comb);
        downloads_string = downloads_string.concat("<br />");
      }
      ractive.set('download_links', downloads_string);
      clearInterval(interval);
    }
    if(batch.state === 'Error' || batch.state === 'Crash')
    {
      alert("POLLING ERROR");
      // TODO: we should open an error panel and print out all the errors that came back
      // submissions.forEach(function(data){
      //   if(data.state === 'Error' || data.state === 'Crash'){}
      // });
      // ractive.set("form_error", data.last_message);
      // ractive.set("psipred_waiting_icon", '');
      // ractive.set("psipred_waiting_message", "<div style='color:red'>This job terminated with the following error<br />"+ractive.get("form_error")+"<br />Please contact <a href='mailto:psipred@cs.ucl.ac.uk'>psipred@cs.ucl.ac.uk</a> quoting the Analysis ID and error message.</div>");
      clearInterval(interval);
    }
  }, 5000);

},{init: false,
   defer: true
 }
);

ractive.on('get_zip', function (context) {
    let uuid = ractive.get('batch_uuid');
    zip.generateAsync({type:"blob"}).then(function (blob) {
        saveAs(blob, uuid+".zip");
    });
});

// These react to the headers being clicked to toggle the results panel
ractive.on( 'downloads_active', function ( event ) {
  ractive.set( 'results_panel_visible', null );
  ractive.set( 'results_panel_visible', 11 );
});

ractive.on( 'psipred_active', function ( event ) {
  ractive.set( 'results_panel_visible', null );
  ractive.set( 'results_panel_visible', 1 );
  ractive.set( 'submission_widget_visible', 1 );
  if(ractive.get('psipred_horiz'))
  {
    biod3.psipred(ractive.get('psipred_horiz'), 'psipredChart', {parent: 'div.psipred_cartoon', margin_scaler: 2});
  }
});

ractive.on( 'disopred_active', function ( event ) {
  ractive.set( 'results_panel_visible', null );
  ractive.set( 'results_panel_visible', 4 );
  ractive.set( 'submission_widget_visible', 1 );
  if(ractive.get('diso_precision'))
  {
    biod3.genericxyLineChart(ractive.get('diso_precision'), 'pos', ['precision'], ['Black',], 'DisoNNChart', {parent: 'div.comb_plot', chartType: 'line', y_cutoff: 0.5, margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300});
  }
});
//
// ractive.on( 'memsatsvm_active', function ( event ) {
//   ractive.set( 'results_panel_visible', null );
//   ractive.set( 'results_panel_visible', 6 );
// });

//grab the submit event from the main form and send the sequence to the backend
ractive.on('submit', function(event) {
  console.log('Submitting data');
  let seq = this.get('sequence');
  seq = seq.replace(/^>.+$/mg, "").toUpperCase();
  seq = seq.replace(/\n|\s/g,"");
  ractive.set('sequence_length', seq.length);
  ractive.set('subsequence_stop', seq.length);
  ractive.set('sequence', seq);

  let name = this.get('name');
  let email = this.get('email');
  let psipred_job = this.get('psipred_job');
  let psipred_checked = this.get('psipred_checked');
  let disopred_job = this.get('disopred_job');
  let disopred_checked = this.get('disopred_checked');
  let memsatsvm_job = this.get('memsatsvm_job');
  let memsatsvm_checked = this.get('memsatsvm_checked');

  verify_and_send_form(seq, name, email, psipred_checked, disopred_checked,
                       memsatsvm_checked, this);
  event.original.preventDefault();
});

// grab the submit event from the Resubmission widget, truncate the sequence
// and send a new job
ractive.on('resubmit', function(event) {
  console.log('Resubmitting segment');
  let start = ractive.get("subsequence_start");
  let stop = ractive.get("subsequence_stop");
  let sequence = ractive.get("sequence");
  let subsequence = sequence.substring(start-1, stop);
  let name = this.get('name')+"_seg";
  let email = this.get('email');
  ractive.set('sequence_length', subsequence.length);
  ractive.set('subsequence_stop', subsequence.length);
  ractive.set('sequence', subsequence);
  ractive.set('name', name);
  let psipred_job = this.get('psipred_job');
  let psipred_checked = this.get('psipred_checked');
  let disopred_job = this.get('disopred_job');
  let disopred_checked = this.get('disopred_checked');
  let memsatsvm_job = this.get('memsatsvm_job');
  let memsatsvm_checked = this.get('memsatsvm_checked');
  //clear what we have previously written
  clear_settings();
  //verify form contents and post
  //console.log(name);
  //console.log(email);
  verify_and_send_form(subsequence, name, email, psipred_checked, disopred_checked,
                       memsatsvm_checked, this);
  //write new annotation diagram
  //submit subsection
  event.original.preventDefault();
});

// Here having set up ractive and the functions we need we then check
// if we were provided a UUID, If the page is loaded with a UUID rather than a
// form submit.
//TODO: Handle loading that page with use the MEMSAT and DISOPRED UUID
//
if(getUrlVars().uuid && uuid_match)
{
  console.log('Caught an incoming UUID');
  seq_observer.cancel();
  ractive.set('results_visible', null ); // should make a generic one visible until results arrive.
  ractive.set('results_visible', 2 );
  ractive.set("batch_uuid", getUrlVars().uuid);
  let previous_data = get_previous_data(getUrlVars().uuid);
  if(previous_data.jobs.includes('psipred'))
  {
      ractive.set('psipred_button', true );
      ractive.set('results_panel_visible', 1);
  }
  if(previous_data.jobs.includes('disopred'))
  {
      ractive.set('disopred_button', true );
      ractive.set('results_panel_visible', 4);
  }
  if(previous_data.jobs.includes('memsatsvm'))
  {
      ractive.set('memsatsvm_button', true );
      ractive.set('results_panel_visible', 6);
  }
  ractive.set('sequence',previous_data.seq);
  ractive.set('email',previous_data.email);
  ractive.set('name',previous_data.name);
  let seq = ractive.get('sequence');
  ractive.set('sequence_length', seq.length);
  ractive.set('subsequence_stop', seq.length);
  ractive.fire('poll_trigger', 'psipred');
}

///////////////////////////////////////////////////////////////////////////////
//
//
// HELPER FUNCTIONS
//
//
///////////////////////////////////////////////////////////////////////////////

//Takes the data needed to verify the input form data, either the main form
//or the submisson widget verifies that data and then posts it to the backend.
function verify_and_send_form(seq, name, email, psipred_checked,
                              disopred_checked, ractive_instance)
{
  /*verify that everything here is ok*/
  let error_message=null;
  let job_string = '';
  //error_message = verify_form(seq, name, email, [psipred_checked, disopred_checked, memsatsvm_checked]);
  ractive.set( 'submission_widget_visible', 1 );

  error_message = verify_form(seq, name, email,
                              [psipred_checked, disopred_checked]);
  if(error_message.length > 0)
  {
    ractive.set('form_error', error_message);
    alert("FORM ERROR:"+error_message);
  }
  else {
    //initialise the page
    let response = true;
    ractive.set( 'results_visible', null );
    //Post the jobs and intialise the annotations for each job
    if(psipred_checked === true)
    {
      job_string = job_string.concat("psipred,");
      ractive.set('psipred_button', true);
    }
    if(disopred_checked === true)
    {
      job_string = job_string.concat("disopred,");
      ractive.set('disopred_button', true);
    }
    if(memsatsvm_checked === true)
    {
      job_string = job_string.concat("memsatsvm,");
      ractive.set('memsatsvm_button', true);
    }

    job_string = job_string.slice(0, -1);
    response = send_job(job_string, seq, name, email, ractive_instance);
    //set visibility and render panel once
    if (psipred_checked === true && response)
    {
      ractive.set( 'results_visible', 2 );
      ractive.fire( 'psipred_active' );
      draw_empty_annotation_panel();
      // parse sequence and make seq plot
    }
    else if(disopred_checked === true && response)
    {
      ractive.set( 'results_visible', 2 );
      ractive.fire( 'disopred_active' );
      draw_empty_annotation_panel();
    }
    else if(memsatsvm_checked === true && response)
    {
      ractive.set( 'results_visible', 2 );
      ractive.fire( 'memsatsvm_active' );
      draw_empty_annotation_panel();
    }

    if(! response){window.location.href = window.location.href;}
  }
}

//before a resubmission is sent all variables are reset to the page defaults
function clear_settings(){
  ractive.set('results_visible', 2);
  ractive.set('results_panel_visible', 1);
  ractive.set('psipred_button', false);
  ractive.set('download_links', '');
  ractive.set('psipred_waiting_message', '<h2>Please wait for your PSIPRED job to process</h2>');
  ractive.set('psipred_waiting_icon', '<object width="140" height="140" type="image/svg+xml" data="'+gears_svg+'"/>');
  ractive.set('psipred_time', 'Loading Data');
  ractive.set('psipred_horiz',null);
  ractive.set('disopred_waiting_message', '<h2>Please wait for your DISOPRED job to process</h2>');
  ractive.set('disopred_waiting_icon', '<object width="140" height="140" type="image/svg+xml" data="'+gears_svg+'"/>');
  ractive.set('disopred_time', 'Loading Data');
  ractive.set('diso_precision');
  ractive.set('memsatsvm_waiting_message', '<h2>Please wait for your MEMSAT-SVM job to process</h2>');
  ractive.set('memsatsvm_waiting_icon', '<object width="140" height="140" type="image/svg+xml" data="'+gears_svg+'"/>');
  ractive.set('memsatsvm_time', 'Loading Data');
  //ractive.set('diso_precision');

  ractive.set('annotations',null);
  ractive.set('batch_uuid',null);

  biod3.clearSelection('div.sequence_plot');
  biod3.clearSelection('div.psipred_cartoon');
  biod3.clearSelection('div.comb_plot');

  zip = new JSZip();
}

//when a results page is instantiated and before some annotations have come back
//we draw and empty annotation panel
function draw_empty_annotation_panel(){

  let seq = ractive.get('sequence');
  let residues = seq.split('');
  let annotations = [];
  residues.forEach(function(res){
    annotations.push({'res': res});
  });
  ractive.set('annotations', annotations);
  biod3.annotationGrid(ractive.get('annotations'), {parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300});
}

//utility function that gets the sequence from a previous submission is the
//page was loaded with a UUID
function get_previous_data(uuid)
{
    console.log('Requesting details given URI');
    let url = submit_url+ractive.get('batch_uuid');
    //alert(url);
    let submission_response = send_request(url, "GET", {});
    if(! submission_response){alert("NO SUBMISSION DATA");}
    let seq = get_text(file_url+submission_response.submissions[0].input_file, "GET", {});
    let jobs = '';
    submission_response.submissions.forEach(function(submission){
      jobs += submission.job_name+",";
    });
    jobs = jobs.slice(0, -1);
    return({'seq': seq, 'email': submission_response.submissions[0].email, 'name': submission_response.submissions[0].submission_name, 'jobs': jobs});
}

//polls the backend to get results and then parses those results to display
//them on the page
function process_file(url_stub, path, ctl)
{
  let url = url_stub + path;
  let path_bits = path.split("/");
  //get a results file and push the data in to the bio3d object
  //alert(url);
  console.log('Getting Results File and processing');
  let response = null;
  $.ajax({
    type: 'GET',
    async:   true,
    url: url,
    success : function (file)
    {
      zip.folder(path_bits[1]).file(path_bits[2], file);
      if(ctl === 'horiz')
      {
        ractive.set('psipred_horiz', file);
        biod3.psipred(file, 'psipredChart', {parent: 'div.psipred_cartoon', margin_scaler: 2});
      }
      if(ctl === 'ss2')
      {
        let annotations = ractive.get('annotations');
        let lines = file.split('\n');
        lines.shift();
        lines = lines.filter(Boolean);
        if(annotations.length == lines.length)
        {
          lines.forEach(function(line, i){
            let entries = line.split(/\s+/);
            annotations[i].ss = entries[3];
          });
          ractive.set('annotations', annotations);
          biod3.annotationGrid(annotations, {parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300});
        }
        else
        {
          alert("SS2 annotation length does not match query sequence");
        }
      }
      if(ctl === 'pbdat')
      {
        //alert('PBDAT process');
        let annotations = ractive.get('annotations');
        let lines = file.split('\n');
        lines.shift(); lines.shift(); lines.shift(); lines.shift(); lines.shift();
        lines = lines.filter(Boolean);
        if(annotations.length == lines.length)
        {
          lines.forEach(function(line, i){
            let entries = line.split(/\s+/);
            if(entries[3] === '-'){annotations[i].disopred = 'D';}
            if(entries[3] === '^'){annotations[i].disopred = 'PB';}
          });
          ractive.set('annotations', annotations);
          biod3.annotationGrid(annotations, {parent: 'div.sequence_plot', margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300});
        }
      }
      if(ctl === 'comb')
      {
        let precision = [];
        let lines = file.split('\n');
        lines.shift(); lines.shift(); lines.shift();
        lines = lines.filter(Boolean);
        lines.forEach(function(line, i){
          let entries = line.split(/\s+/);
          precision[i] = {};
          precision[i].pos = entries[1];
          precision[i].precision = entries[4];
        });
        ractive.set('diso_precision', precision);
        biod3.genericxyLineChart(precision, 'pos', ['precision'], ['Black',], 'DisoNNChart', {parent: 'div.comb_plot', chartType: 'line', y_cutoff: 0.5, margin_scaler: 2, debug: false, container_width: 900, width: 900, height: 300, container_height: 300});
      }
    },
    error: function (error) {alert(JSON.stringify(error));}
  });
}

//get text contents from a result URI
function get_text(url, type, send_data)
{

 let response = null;
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
function send_job(job_name, seq, name, email, ractive_instance)
{
  //alert(seq);
  console.log("Sending form data");
  var file = null;
  let upper_name = job_name.toUpperCase();
  try
  {
    file = new Blob([seq]);
  } catch (e)
  {
    alert(e);
  }
  let fd = new FormData();
  fd.append("input_data", file, 'input.txt');
  fd.append("job",job_name);
  fd.append("submission_name",name);
  fd.append("email", email);

  let response_data = send_request(submit_url, "POST", fd);
  if(response_data !== null)
  {
    times = send_request(times_url,'GET',{});
    //alert(JSON.stringify(times));
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
        ractive_instance.set('batch_uuid', response_data[k]);
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
  console.log('Sending URI request');
  console.log(url);
  console.log(type);

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
function verify_form(seq, job_name, email, checked_array)
{
  let error_message = "";
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
  let nucleotide_count = (seq.match(/A|T|C|G|U|N|a|t|c|g|u|n/g)||[]).length;
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
    let vars = {};
    //consider using location.search instead here
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
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
    let important = "!important;";
    let style = "position:absolute" + important + "visibility:hidden" + important + "width:1em" + important + "font-size:1em" + important + "padding:0" + important;

    window.getEmPixels = function (element) {

        let extraBody;

        if (!element) {
            // Emulate the documentElement to get rem value (documentElement does not work in IE6-7)
            element = extraBody = document.createElement("body");
            extraBody.style.cssText = "font-size:1em" + important;
            documentElement.insertBefore(extraBody, document.body);
        }

        // Create and style a test element
        let testElement = document.createElement("i");
        testElement.style.cssText = style;
        element.appendChild(testElement);

        // Get the client width of the test element
        let value = testElement.clientWidth;

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
