from __future__ import unicode_literals

from django import forms
from django.forms.formsets import BaseFormSet, formset_factory

from bootstrap3.tests import TestForm

from .models import *


class PsipredForm(forms.ModelForm):
    psipred_job = forms.BooleanField(label="PSIPRED 4.0", required=False,
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{psipred_job}}',
                                             'checked': '{{psipred_checked}}'
                                             }))
    disopred_job = forms.BooleanField(label="DISOPRED3", required=False,
                                      widget=forms.CheckboxInput(
                                       attrs={'value': '{{disopred_job}}',
                                              'checked': '{{disopred_checked}}'
                                              }))
    memsatsvm_job = forms.BooleanField(label="MEMSAT-SVM", required=False,
                                       widget=forms.CheckboxInput(
                                        attrs={'value': '{{memsatsvm_job}}',
                                               'checked': '{{memsatsvm_checked}}'
                                               }))
    pgenthreader_job = forms.BooleanField(label="pGenTHREADER", required=False,
                                          widget=forms.CheckboxInput(
                                          attrs={'value': '{{pgenthreader_job}}',
                                                 'checked': '{{pgenthreader_checked}}'
                                                 }))
    mempack_job = forms.BooleanField(label="MEMPACK", required=False,
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{mempack_job}}',
                                             'checked': '{{mempack_checked}}'
                                             }))
    genthreader_job = forms.BooleanField(label="GenTHREADER", required=False,
                                         widget=forms.CheckboxInput(
                                          attrs={'value': '{{genthreader_job}}',
                                                'checked': '{{genthreader_checked}}'
                                                 }))
    dompred_job = forms.BooleanField(label="DomPred", required=False,
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{dompred_job}}',
                                             'checked': '{{dompred_checked}}'
                                             }))
    pdomthreader_job = forms.BooleanField(label="pDomTHREADER", required=False,
                                          widget=forms.CheckboxInput(
                                          attrs={'value': '{{pdomthreader_job}}',
                                                 'checked': '{{pdomthreader_checked}}'
                                                 }))
    bioserf_job = forms.BooleanField(label="Bioserf 2.0", required=False,
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{bioserf_job}}',
                                             'checked': '{{bioserf_checked}}'
                                             }))
    domserf_job = forms.BooleanField(label="Domserf 2.1", required=False,
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{domserf_job}}',
                                             'checked': '{{domserf_checked}}'
                                             }))
    ffpred_job = forms.BooleanField(label="FFPred 3", required=False,
                                    widget=forms.CheckboxInput(
                                      attrs={'value': '{{ffpred_job}}',
                                             'checked': '{{ffpred_checked}}'
                                             }))
    metapsicov_job = forms.BooleanField(label="MetaPSICOV 2.0", required=False,
                                        widget=forms.CheckboxInput(
                                         attrs={'value': '{{metapsicov_job}}',
                                                'checked': '{{metapsicov_checked}}'
                                                }))

    metsite_job = forms.BooleanField(label="Metsite", required=False,
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{metsite_job}}',
                                             'checked': '{{metsite_checked}}'
                                             }))
    hspred_job = forms.BooleanField(label="HSPred", required=False,
                                    widget=forms.CheckboxInput(
                                      attrs={'value': '{{hspred_job}}',
                                             'checked': '{{hspred_checked}}'
                                             }))
    memembed_job = forms.BooleanField(label="MEMEMBED", required=False,
                                      widget=forms.CheckboxInput(
                                       attrs={'value': '{{memembed_job}}',
                                              'checked': '{{memembed_checked}}'
                                              }))
    gentdb_job = forms.BooleanField(label="Generate TDB", required=False,
                                    widget=forms.CheckboxInput(
                                      attrs={'value': '{{gentdb_job}}',
                                             'checked': '{{gentdb_checked}}'
                                             }))

    input_data = forms.CharField(initial="Input Sequence",
                                 widget=forms.Textarea(
                                  attrs={'value': '{{sequence}}'}))
    job_name = forms.CharField(widget=forms.TextInput(
                                attrs={'value': '{{name}}'}))
    email = forms.EmailField(widget=forms.EmailInput(
                              attrs={'value': '{{email}}'}))

    class Meta:
        model = Request
        fields = ('psipred_job', 'disopred_job', 'memsatsvm_job',
                  'pgenthreader_job', 'metapsicov_job', 'mempack_job',
                  'genthreader_job', 'dompred_job', 'pdomthreader_job',
                  'bioserf_job', 'domserf_job', 'ffpred_job',
                  'input_data', 'job_name', 'email', )
