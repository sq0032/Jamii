from django.conf.urls import patterns, include, url

from django.contrib import admin
from team.views import *
admin.autodiscover()

urlpatterns = patterns('',
    #url(r'^$', user),
#    url(r'^(\d+)/teams/$', teams),
    url(r'^(\d+)/?$', team),
    url(r'^test$', test),
)
