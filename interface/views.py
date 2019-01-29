from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django import forms
from django.conf import settings

from .forms import *


def index(request):

    template = loader.get_template('interface/index.html')
    base_url = ''
    if settings.STAGING:
        base_url = 'http://bioinf.cs.ucl.ac.uk/psipred_beta'
    if settings.PRODUCTION:
        base_url = 'http://bioinf.cs.ucl.ac.uk/psipred_new'
    passing_data = {"form": PsipredForm(),
                    "staging": settings.STAGING,
                    "debug": settings.DEBUG,
                    "production": settings.PRODUCTION,
                    "static_base_url": base_url}
    return render(request, 'interface/index.html', passing_data)
