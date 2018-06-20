from __future__ import unicode_literals

from django import forms
from django.forms.formsets import BaseFormSet, formset_factory
from django.utils.safestring import mark_safe

from bootstrap3.tests import TestForm

from .models import *


class PsipredForm(forms.ModelForm):
    psipred_job = forms.BooleanField(label="PSIPRED 4.0 (Predict Secondary Structure)", required=False,
                                     label_suffix = "",
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{psipred_job}}',
                                             'checked': '{{psipred_checked}}'
                                             }))
    disopred_job = forms.BooleanField(label="DISOPRED3 (Disored Prediction)", required=False,
                                     label_suffix = "",
                                      widget=forms.CheckboxInput(
                                       attrs={'value': '{{disopred_job}}',
                                              'checked': '{{disopred_checked}}'
                                              }))
    memsatsvm_job = forms.BooleanField(label="MEMSAT-SVM (Membrane Helix Prediction)", required=False,
                                     label_suffix = "",
                                       widget=forms.CheckboxInput(
                                        attrs={'value': '{{memsatsvm_job}}',
                                               'checked': '{{memsatsvm_checked}}'
                                               }))
    pgenthreader_job = forms.BooleanField(label="pGenTHREADER (Profile Based Fold Recognition)", required=False,
                                     label_suffix = "",
                                          widget=forms.CheckboxInput(
                                          attrs={'value': '{{pgenthreader_job}}',
                                                 'checked': '{{pgenthreader_checked}}'
                                                 }))
    mempack_job = forms.BooleanField(label="MEMPACK (TM Topology and Helix Packing)", required=False,
                                     label_suffix = "",
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{mempack_job}}',
                                             'checked': '{{mempack_checked}}'
                                             }))
    genthreader_job = forms.BooleanField(label="GenTHREADER (Rapid Fold Recognition)", required=False,
                                     label_suffix = "",
                                         widget=forms.CheckboxInput(
                                          attrs={'value': '{{genthreader_job}}',
                                                'checked': '{{genthreader_checked}}'
                                                 }))
    dompred_job = forms.BooleanField(label="DomPred (Protein Domain Prediction)", required=False,
                                     label_suffix = "",
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{dompred_job}}',
                                             'checked': '{{dompred_checked}}',
                                             'on-click': mark_safe('@this.fire("show_dompred")'),
                                             }))
    pdomthreader_job = forms.BooleanField(label="pDomTHREADER (Protein Domain Fold Recognition)", required=False,
                                     label_suffix = "",
                                          widget=forms.CheckboxInput(
                                          attrs={'value': '{{pdomthreader_job}}',
                                                 'checked': '{{pdomthreader_checked}}'
                                                 }))
    bioserf_job = forms.BooleanField(label="Bioserf 2.0 (Automated Homology Modelling)", required=False,
                                     label_suffix = "",
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{bioserf_job}}',
                                             'checked': '{{bioserf_checked}}',
                                             'on-click': mark_safe('@this.fire("show_bioserf")'),
                                             }))
    domserf_job = forms.BooleanField(label="Domserf 2.1 (Automated Domain Homology Modelling)", required=False,
                                     label_suffix = "",
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{domserf_job}}',
                                             'checked': '{{domserf_checked}}',
                                             'on-click': mark_safe('@this.fire("show_domserf")'),
                                             }))
    ffpred_job = forms.BooleanField(label="FFPred 3 (Eurkaryotic Function Prediction)", required=False,
                                     label_suffix = "",
                                    widget=forms.CheckboxInput(
                                      attrs={'value': '{{ffpred_job}}',
                                             'checked': '{{ffpred_checked}}',
                                             'on-click': mark_safe('@this.fire("show_ffpred")'),
                                             }))
    metapsicov_job = forms.BooleanField(label="MetaPSICOV 2.0 (Structural Contact Prediction)", required=False,
                                     label_suffix = "",
                                        widget=forms.CheckboxInput(
                                         attrs={'value': '{{metapsicov_job}}',
                                                'checked': '{{metapsicov_checked}}'
                                                }))
    metsite_job = forms.BooleanField(label="Metsite (Protein-metal Ion Contact Prediction)", required=False,
                                     label_suffix = "",
                                     widget=forms.CheckboxInput(
                                      attrs={'value': '{{metsite_job}}',
                                             'checked': '{{metsite_checked}}',
                                             'on-click': mark_safe('@this.fire("show_metsite")'),
                                             }))
    hspred_job = forms.BooleanField(label="HSPred (Protein-Protein Hotspot Residue Prediction)", required=False,
                                     label_suffix = "",
                                    widget=forms.CheckboxInput(
                                      attrs={'value': '{{hspred_job}}',
                                             'checked': '{{hspred_checked}}',
                                             'on-click': mark_safe('@this.fire("show_hspred")'),
                                             }))
    memembed_job = forms.BooleanField(label="MEMEMBED (Membrane Protein Orientation Prediction)", required=False,
                                     label_suffix = "",
                                      widget=forms.CheckboxInput(
                                       attrs={'value': '{{memembed_job}}',
                                              'checked': '{{memembed_checked}}',
                                              'on-click': mark_safe('@this.fire("show_memembed")'),
                                              }))
    gentdb_job = forms.BooleanField(label="Generate TDB (Custom Generated Threading File)", required=False,
                                     label_suffix = "",
                                    widget=forms.CheckboxInput(
                                      attrs={'value': '{{gentdb_job}}',
                                             'checked': '{{gentdb_checked}}'
                                             }))

    input_data = forms.CharField(label="Input data",
                                initial="Input Sequence",
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
                  'bioserf_job', 'domserf_job', 'ffpred_job', 'metsite_job',
                  'hspred_job', 'memembed_job', 'gentdb_job',
                  'input_data', 'job_name', 'email', )
