from __future__ import unicode_literals

from django import forms
from django.forms.formsets import BaseFormSet, formset_factory

from bootstrap3.tests import TestForm

from .models import *


class PsipredForm(forms.ModelForm):
    input_data = forms.CharField(initial="This",
                                 widget=forms.Textarea(attrs={'value': '{{sequence}}'}))

    class Meta:
        model = Request
        fields = ('psipred_job', 'input_data', 'job_name',
                  'email', )
