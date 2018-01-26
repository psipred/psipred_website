import requests

from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.conf import settings


def index(request):
    aln_url = request.GET['aln']
    r = request.post(aln_url, data={}, files={})
    print(r)
    # use aln to get the alignments data to submit as the input
    url = 'http://127.0.0.1:8000/analytics_automated/submission.json'
    data = {'job': 'pdb_modeller',
            'submission_name': 'mod_job',
            'email': '', }
    r = requests.post(url, data=data, files=payload)
    print(r.text)
    data = {"UUID": r.text, }
    # submit URL to aa server
    # send new ID to page and have page poll for the result
    return render(request, 'model/index.html', data)
