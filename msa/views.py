from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.conf import settings


def index(request):
    urls = {"aln": request.GET['aln'],
            "ann": request.GET['ann'],
            }
    return render(request, 'msa/index.html', urls)
