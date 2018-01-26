import requests

from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.conf import settings


def index(request):

    url = 'http://127.0.0.1:8000/analytics_automated/submission.json'
    data = {'job': 'simple_modeller',
            'submission_name': 'mod_job',
            'email': '', }
    r = requests.post(url, data=data, files=payload)
    print(r.text)
    data = {"UUID": r.text, }
    # submit URL to aa server
    # send new ID to page and have page poll for the result
    return render(request, 'model/index.html', data)
