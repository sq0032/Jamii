from django.conf.urls import patterns, include, url

from django.contrib import admin
from team.views import *
admin.autodiscover()

urlpatterns = patterns('',
    #url(r'^$', user),
#    url(r'^(\d+)/teams/$', teams),
    url(r'^(\d+)/?$', team),
    url(r'^test$', test),
    url(r'^(\d+)/files', files),
    url(r'^(\d+)/file', file),
    url(r'^(\d+)/msgboxes', msgboxes),
    url(r'^(\d+)/msgbox', msgboxes),
    url(r'^(\d+)/members', members),
)
