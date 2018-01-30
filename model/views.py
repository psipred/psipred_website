import requests as req
import re
import json

from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.conf import settings


def index(request):
    aln_url = request.GET['aln']
    print(aln_url)
    # use aln to get the alignments data to submit as the inpu
    r = req.get(aln_url, data={}, files={})
    alignment = r.text

    url = 'http://127.0.0.1:8000/analytics_automated/submission.json'
    data = {'job': 'pdb_modeller',
            'submission_name': 'mod_job',
            'email': 'dummy@dummy.com', }
    payload = {'input_data': ('input.txt', alignment)}
    r = req.post(url, data=data, files=payload)
    print(r.text)
    obj = json.loads(r.text)
    print(obj)
    # submit URL to aa server
    # send new ID to page and have page poll for the result
    data = {'UUID': obj['UUID']}
    return render(request, 'model/index.html', data)


    # pdb_re = re.compile(r"^>(\d.{5})")
    # m = re.search(pdb_re, r.text)
    # if m:
    #     print(m.group(1))
