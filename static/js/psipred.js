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
      job_name = this.get('name')
      job_name = this.get('email')
      alert(seq)
      event.original.preventDefault()
  })

/* ractive.on({
    process_form: function ( event, which ) {
      ractive.set( 'visible', null ).then( function () {
        ractive.set( 'visible', which );
        ractive.set( 'visible', 3 );

      });
    }
  });
*/
