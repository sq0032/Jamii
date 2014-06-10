from django.conf.urls import patterns, include, url

from django.contrib import admin
from account.views import *
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', user),
    url(r'^teams/$', teams),
    url(r'^test/$', test),
    url(r'^edit/$', editProfile),
    #url(r'^test$', user),
)
