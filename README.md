# Adding new services
1. Add the new job types and its tasks to the backend (analytics automated)

2. Update models.py request() model to add new BooleanField for the job
    memsatsvm_job = models.BooleanField(null=False, default=False)

3. Update forms.py to add new field and add the new field to fields=[]
   note how the attrs for the form element are ractive variables
        disopred_job = forms.BooleanField(label="DISOPRED3", required=False,
                                      widget=forms.CheckboxInput(
                                       attrs={'value': '{{disopred_job}}',
                                              'checked': '{{disopred_checked}}'
                                              }))
        fields = ('psipred_job', 'disopred_job', 'memsatsvm_job', 'input_data',
                  'job_name', 'email', )

4. migrate db changes
$ python manage.py makemigrations --settings=psipred_website.settings.dev
$ python manage.py migrate --settings=psipred_website.settings.dev

5. Update mainform.html, updating both the checkboxes and the form_error section.
   Table layout is a function of the ordering in fields variable in forms.py

6. Add resubmission checkbox for new method in resubmission.html

7. Add new results panel bits in results_panel.html

8. If you need to, add an alert to alerts.js

9. For production update the aa_head http.conf to ensure the files are
   being served with the right type.
