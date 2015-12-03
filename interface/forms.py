from __future__ import unicode_literals

from django import forms
from django.forms.formsets import BaseFormSet, formset_factory

from bootstrap3.tests import TestForm

from .models import *


class PsipredForm(forms.ModelForm):

    class Meta:
        model = Request
        fields = ('psipred_job', 'input_data', 'job_name',
                  'password', 'email', )
