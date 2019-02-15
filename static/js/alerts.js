
 function metAlert()
 {
  // Get the checkbox
  var checkBox = document.getElementById("id_metapsicov_job");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    alert("MetaPSICOV analyses can take longer than 6 hours. If you wish to run multiple analyses please submit the MetaPSICOV job as a seperate submission");
  }
 }
