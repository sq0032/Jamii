from django.conf.urls import patterns, include, url

from django.contrib import admin
from Jamii.view import *
from book import views
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Jamii.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^hello/$', hello),
    url(r'^time/$', current_datatime),
    url(r'^time/plus/(\d{1,2})/$', hours_ahead),
    url(r'^temp/$', template),
    url(r'^test/$', test),
    url(r'^search-form/$', views.search_form),
    url(r'^search/$', views.search),
    url(r'^contact/$', contact),
    url(r'^login/$', login),
    url(r'^$', main),
)

