/* 1. Catch form input
     2. Verify form
     3. If good then make file from data and pass to backend
     4. shrink form away
     5. Open seq panel
     6. Show processing animation
     7. listen for result
*/

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
  el: '#model_site',
  template: '#model_template',
  data: {
          model_uuid: null,
          building_message: '<h1>Building Model...</h1>',
        }
});

//4b6ad792-ed1f-11e5-8986-989096c13ee6

///////////////////////////////////////////////////////////////////////////////
//
//
// APPLICATION HERE
//
//
///////////////////////////////////////////////////////////////////////////////

//After a job has been sent or a URL accepted this ractive block is called to
//poll the backend to get the results
ractive.on('poll_trigger', function(name, job_type){
  console.log("Polling backend for results");
  let url = submit_url + ractive.get('model_uuid');
  let pdb_uri = null;
  let interval = setInterval(function(){
    let batch = send_request(url, "GET", {});
    let downloads_info = {};
    if(batch.state === 'Complete')
    {
      console.log("Render results");
      let submissions = batch.submissions;
      submissions.forEach(function(data){
          let results = data.results;
          for(var i in results)
          {
            let result_dict = results[i];
            if(result_dict.name === 'pdb_modeller')
            {
              pdb_uri = file_url+result_dict.data_path;
            }
          }
      });
      if(pdb_uri){
           var cartoon_color = function(atom) {
              if(atom.ss === 'h'){return '#e353e3';}
              if(atom.ss === 's'){return '#e5dd55';}
              return('grey');
            };
          ractive.set('building_message', "Download <a href='"+pdb_uri+"'>This Model</a>");
          console.log("LOADING: "+pdb_uri);
          let element = $('#container-01');
          let config = { backgroundColor: '#ffffff' };
          let viewer = $3Dmol.createViewer( element, config );
          let data = get_text(pdb_uri, "GET", {});
          viewer.addModel( data, "pdb" );                       /* load data */
          viewer.setStyle({}, {cartoon: {colorfunc: cartoon_color}});  /* style all atoms */
          viewer.zoomTo();                                      /* set camera */
          viewer.render();                                      /* render scene */
          viewer.zoom(1.7, 3000);                               /* slight zoom */
      }
      clearInterval(interval);
    }
    if(batch.state === 'Error' || batch.state === 'Crash')
    {
      alert("MODEL BUILDING FAILED");
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

// Here having set up ractive and the functions we need we then check
// if we were provided a UUID, If the page is loaded with a UUID rather than a
// form submit.
//TODO: Handle loading that page with use the MEMSAT and DISOPRED UUID
//
let uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let uuid_match = uuid_regex.exec(getUrlVars().uuid);

if(getUrlVars().uuid && uuid_match)
{
  console.log('Caught an incoming UUID');
  ractive.set('spinner_visible', null ); // should make a generic one visible until results arrive.
  ractive.set('spinner_visible', 1 );
  ractive.set("model_uuid", getUrlVars().uuid);
  ractive.fire('poll_trigger', 'model');
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


///////////////////////////////////////////////////////////////////////////////
//
//
// HELPER FUNCTIONS
//
//
///////////////////////////////////////////////////////////////////////////////

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
