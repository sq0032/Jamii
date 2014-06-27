from django.conf.urls import patterns, include, url

from django.contrib import admin
from inbox.views import *
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^test$', test),
    url(r'^msg$', message),
    url(r'^$', msgboxes),
    url(r'^(\d+)/?$', messages),
    url(r'^user/?$', usertag),
    
    #url(r'^$', cards),
    #url(r'^card/(\d+)$', card),
    #url(r'^list/(\d+)/$', list),
    #url(r'^(\d+)/$', board),
)
