# Adding new services
1. Add the new job types and its tasks to the backend

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

5. Update mainform.html, updating both the checkboxes and the form_error section

6. Ensure you have a button in the results toggling button group results_toggle.html

7. Add resubmission checkbox for new method in resubmission.html

8. Add new results panel bits in results_panel.html
