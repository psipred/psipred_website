#
Adding new services
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

5. Update formgroup in template from line 87 templates/index.html
    {% if "MEMSAT-SVM" in field.label %}
        {{ field.errors }}
        {{ field.label_tag }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ field }}
    {% endif %}

6. Ensure you have a button in the vertical button group, from line 32
    {% templatetag openvariable %}#if memsatsvm_button{% templatetag closevariable %}
      <button on-click='memsatsvm_active' type="button" class="btn btn-default">MEMSAT-SVM</button>
    {% templatetag openvariable %}/if{% templatetag closevariable %}

7. Add resubmission checkbox, from line 165
      <div class="checkbox">
        <label for="id_memsat_job">MEMSAT-SVM:</label>
        <input id="id_memsat_job" name="memsat_job" value="memsat_job" type="checkbox" checked="{% ractivetag "memsat_checked" %}">
      </div>

8. Note the annotation panels line 123   <!-- Annotation panel --> add a new type for the new service
   Also requires a div for any plots
    {% templatetag openvariable %}#if results_panel_visible === 6 {% templatetag closevariable %}
    <div class="mm_plot"></div>
    <div class="waiting" intro="slide" outro="slide">{% ractivehtmltag "memsatsvm_waiting_message" %}</div>
    <div class="waiting_icon" intro="slide" outro="slide">{% ractivehtmltag "memsatsvm_waiting_icon" %}<br />{% ractivehtmltag "memsatsvm_time" %}</div>
    {% templatetag openvariable %}/if{% templatetag closevariable %}
