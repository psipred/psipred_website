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
          psipred_checked: false,
          psipred_job: 'psipred_job',
          waiting: 'Please wait for your job to process',
          //sequence: "asdasdasdasdasdasdasdasdasdasdasdasdasdasda",
          //email: 'daniel.buchan@ucl.ac.uk',
          //name: 'test',
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

ractive.on('submit', function(event) {
      seq = this.get('sequence')
      seq = seq.replace(/^>.+$/mg, "").toUpperCase()
      seq = seq.replace(/\n|\s/g,"")
      job_name = this.get('name')
      email = this.get('email')
      psipred_job = this.get('psipred_job')
      psipred_checked = this.get('psipred_checked')
      /*verify that everything here is ok*/
      error_message = verify_form(seq, job_name, email, [psipred_checked])
      if(error_message.length > 0)
      (
        this.set('form_error', error_message)
      )
      else {
        ractive.set( 'visible', null );
        ractive.set( 'visible', 2 );

      }
      /*construct rest URL*/

      /*construct REST packet */

      /* send rest request */
      event.original.preventDefault()
  })

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
