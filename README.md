# Dev installation
1. Add secrets files to psipred_website/psipred_website/settings
   touch base_secrets.json
   touch dev_secrets.json
2. Add to base_secrets.json
{

}
3. Add to dev secrets.json to psipred_website/psipred_website/settings
{
  "USER": "psipred_user",
  "PASSWORD": "thisisthedevelopmentpasswordguys",
  "SECRET_KEY": "SOMELONG STRING"
}
4. Add role to postgres
    psql -h localhost -d postgres
    CREATE ROLE psipred_user WITH LOGIN PASSWORD 'thisisthedevelopmentpasswordguys';
    CREATE DATABASE psipred_website_db;
    GRANT ALL PRIVILEGES ON DATABASE psipred_website_db TO psipred_user;
    ALTER USER psipred_user CREATEDB;
5. create logs dir
    mkdir logs
7. migrate
 python manage.py migrate --settings=psipred_website.settings.dev
6. Add superuser
python manage.py createsuperuser --settings=psipred_website.settings.dev

7. start
./start_dev.sh
8. View site at 127.0.0.1:4000/interface
   or 127.0.0.1:4000/admin

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

10. Add job times in the times panel of index.html
