from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django import forms
from django.conf import settings

from .forms import *


def index(request):

    template = loader.get_template('interface/index.html')
    passing_data = {"form": PsipredForm(),
                    "staging": settings.STAGING,
                    "debug": settings.DEBUG}
    return render(request, 'interface/index.html', passing_data)
