from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django import forms
from django.conf import settings

from .forms import *


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def index(request):
    template = loader.get_template('interface/index.html')
    suspension_message = None
    server_message = None
    try:
        suspension_message = ServerSuspension.objects.all()[0]
    except:
        suspension_message = None

    try:
        server_message = ServerMessage.objects.all()[0]
    except:
        server_message = None



    passing_data = {}
    if suspension_message:
        passing_data = {"form": PsipredForm(),
                        "staging": settings.STAGING,
                        "debug": settings.DEBUG,
                        "production": settings.PRODUCTION,
                        "static_base_url": settings.STATIC_BASE_URL,
                        "suspend": suspension_message.suspend,
                        "suspend_message": suspension_message.message
                        }
        if server_message:
            passing_data["server_display"] = server_message.display
            passing_data["server_message"] = server_message.message
        else:
            passing_data["server_display"] = None
            passing_data["server_message"] = None

        client_ip = get_client_ip(request)
        print("CLIENT IP", client_ip)
        print("ALLOWED IP", suspension_message.allowed_ip)
        if client_ip == suspension_message.allowed_ip:
            passing_data['suspend'] = False
            passing_data['suspend_message'] = ''
    else:
        passing_data = {"form": PsipredForm(),
                        "staging": settings.STAGING,
                        "debug": settings.DEBUG,
                        "production": settings.PRODUCTION,
                        "static_base_url": settings.STATIC_BASE_URL,
                        "suspend": False,
                        "suspend_message": ''
                        }
        if server_message:
            passing_data["server_display"] = server_message.display
            passing_data["server_message"] = server_message.message
        else:
            passing_data["server_display"] = None
            passing_data["server_message"] = None

    return render(request, 'interface/index.html', passing_data)
