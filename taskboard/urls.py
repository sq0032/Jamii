from django.conf.urls import patterns, include, url

from django.contrib import admin
from taskboard.views import *
admin.autodiscover()

urlpatterns = patterns('',
    #url(r'^$', user),
#    url(r'^(\d+)/teams/$', teams),
    #url(r'^(\d+)/$', team),
    url(r'^test$', test),
    url(r'^card$', cards),
    url(r'^card/(\d+)$', card),
    url(r'^list/(\d+)/$', list),
    url(r'^(\d+)/$', board),
)
