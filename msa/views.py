from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.conf import settings


def index(request):
    base_url = ''
    if settings.STAGING:
        base_url = 'http://bioinf.cs.ucl.ac.uk/psipred_beta'
    if settings.PRODUCTION:
        base_url = 'http://bioinf.cs.ucl.ac.uk/psipred_new'
    urls = {"aln": request.GET['aln'],
            "ann": request.GET['ann'],
            "staging": settings.STAGING,
            "debug": settings.DEBUG,
            "production": settings.PRODUCTION,
            "static_base_url": base_url
            }
    return render(request, 'msa/index.html', urls)
