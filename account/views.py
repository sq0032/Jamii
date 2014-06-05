from django.shortcuts import render
from django.http import HttpResponse
from account.models import JamiiUser

from django import template
# Create your views here.
def user(request, user_id):
    user        = JamiiUser.objects.filter(id=user_id)[0]
    thumbnail   = user.thumbnail.url
    c           = template.Context({'thumbnail':thumbnail})
    t           = template.Template('<img src={{MEDIA_URL}}{{thumbnail}}/>')
    html        = t.render(c)
    return HttpResponse(html)

def users(request):
    user = JamiiUser.objects.all()
    return HttpResponse('test')