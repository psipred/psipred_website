from __future__ import unicode_literals

from django import forms
from django.forms.formsets import BaseFormSet, formset_factory

from bootstrap3.tests import TestForm

from .models import *


class PsipredForm(forms.ModelForm):
    psipred_job = forms.BooleanField(widget=forms.CheckboxInput(attrs={'value': '{{psipred_job}}'}))
    input_data = forms.CharField(initial="Input Sequence",
                                 widget=forms.Textarea(attrs={'value': '{{sequence}}'}))
    job_name = forms.CharField(widget=forms.TextInput(attrs={'value': '{{name}}'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'value': '{{email}}'}))

    class Meta:
        model = Request
        fields = ('psipred_job', 'input_data', 'job_name',
                  'email', )
