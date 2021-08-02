from django.contrib import admin

from .models import *

admin.site.register([ServerSuspension, ServerMessage])


class ServerSuspensionAdmin(admin.ModelAdmin):
    list_display = ('pk', 'suspend', 'message', "allowed_ip")


class ServerMessageAdmin(admin.ModelAdmin):
    list_display = ('pk', 'display', 'message')
