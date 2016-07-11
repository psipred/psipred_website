from __future__ import unicode_literals

from django import forms
from django.forms.formsets import BaseFormSet, formset_factory

from bootstrap3.tests import TestForm

from .models import *


class PsipredForm(forms.ModelForm):
    psipred_job = forms.BooleanField(label="PSIPRED 4.0", widget=forms.CheckboxInput(attrs={'value': '{{psipred_job}}', 'checked': '{{psipred_checked}}'}))
    disopred_job = forms.BooleanField(label="DISOPRED3", widget=forms.CheckboxInput(attrs={'value': '{{disopred_job}}', 'checked': '{{disopred_checked}}'}))

    input_data = forms.CharField(initial="Input Sequence",
                                 widget=forms.Textarea(attrs={'value': '{{sequence}}'}))
    job_name = forms.CharField(widget=forms.TextInput(attrs={'value': '{{name}}'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'value': '{{email}}'}))

    class Meta:
        model = Request
        fields = ('psipred_job', 'disopred_job', 'input_data', 'job_name',
                  'email', )
