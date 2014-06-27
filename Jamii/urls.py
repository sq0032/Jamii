from django.conf.urls import patterns, include, url

from django.contrib import admin
from Jamii.views import *
import os
from Jamii import settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Jamii.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/?', include(admin.site.urls)),
    url(r'^account/', include('account.urls')),
    url(r'^team/', include('team.urls')),
    url(r'^taskboard/', include('taskboard.urls')),
    url(r'^inbox/', include('inbox.urls')),
    
    #test function
    url(r'^test/$', test),
    
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': os.path.join(settings.BASE_DIR, 'media/')}),
    
    url(r'^$', main),
)
