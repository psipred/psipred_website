from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^jmol.*', views.jmol, name='jmol'),
    url(r'^post.*', views.post, name='post'),
]
