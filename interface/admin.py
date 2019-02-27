from django.contrib import admin

from .models import *

admin.site.register(ServerSuspension)


class ServerSuspensionAdmin(admin.ModelAdmin):
    list_display = ('pk', 'suspend', 'message', "allowed_ip")
