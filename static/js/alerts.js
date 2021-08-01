
 function metAlert()
 {
  // Get the checkbox
  var checkBox = document.getElementById("id_metapsicov_job");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    alert("MetaPSICOV analyses can take longer than 6 hours. If you wish to run multiple analyses please submit the MetaPSICOV job as a seperate submission");
  }
 }

 function dmpfoldAlert()
 {
  // Get the checkbox
  var checkBox = document.getElementById("id_dmpfold_job");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    alert("DMPFold analyses can take up to 6 hours. We advise you submit DMPfold jobs seperately to other predictions\n\nNote that DMP gives less accurate results for sequences larger than 500 residues, you should divide your sequence into shorter domains before submission");
  }
 }
