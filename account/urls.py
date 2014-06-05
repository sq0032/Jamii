from django.conf.urls import patterns, include, url

from django.contrib import admin
from account.views import *
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^(\d+)/$', user),
    url(r'^$', user),
)
