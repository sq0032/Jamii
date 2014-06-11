from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.contrib import auth
from team.models import *
import json

# Create your views here.
def test(request):
    print '123'
    return HttpResponse('team test')

def team(request, teamid):
    try:
        team = Team.objects.filter(id=teamid)[0]
    except IndexError:
        raise Http404
    
    data = {}
    data['id']              = teamid
    data['name']            = team.name
    data['introduction']    = team.introduction
    data['members']         = []
    for member in team.members.all():
        data['members'].append(member.id)
    
    return HttpResponse(json.dumps(data), content_type="application/json")