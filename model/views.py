import requests as req
import re
import json

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.conf import settings


def jmol(request):
    data = {"staging": settings.STAGING,
            "debug": settings.DEBUG}
    return render(request, 'model/index.html', data)


def post(request):
    aln_url = request.GET['aln']
    # print(aln_url)
    # use aln to get the alignments data to submit as the inpu
    r = req.get(aln_url, data={}, files={})
    alignment = r.text

    submission_url = 'http://bioinf.cs.ucl.ac.uk/psipred_beta/submission/api/submission.json'
    redirect_url = 'http://bioinf.cs.ucl.ac.uk/psipred_beta/'
    if settings.DEBUG:
        submission_url = 'http://127.0.0.1:8000/analytics_automated/submission.json'
        redirect_url = 'http://127.0.0.1:4000/interface/'

    client = req.session()
    client.get(submission_url)
    csrftoken = ''
    if 'csrftoken' in client.cookies:
        csrftoken = client.cookies['csrftoken']
    print(submission_url)
    print("CSRFTOKEN: "+csrftoken)
    data = {'job': 'pdb_modeller',
            'submission_name': 'mod_job',
            'email': 'dummy@dummy.com',
            'csrfmiddlewaretoken': csrftoken}
    payload = {'input_data': ('input.txt', alignment)}
    r = client.post(submission_url, data=data, files=payload,
                    headers={'Referer': submission_url})
    print(r.text)
    obj = json.loads(r.text)
    # print(obj)
    # submit URL to aa server
    # send new ID to page and have page poll for the result
    return redirect(redirect_url+"model/jmol/?uuid="+obj['UUID'])
