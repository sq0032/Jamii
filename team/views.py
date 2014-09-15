from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.contrib import auth
from team.models import *
from django.contrib.auth.decorators import login_required
import json

# Create your views here.
def test(request):
    print '123'
    return HttpResponse('team test')

@login_required
def team(request, teamid):
    try:
        team = Team.objects.filter(id=teamid)[0]
    except IndexError:
        raise Http404
    
    member_arr = []
    for member in team.members.all():
        member_arr.append(member.id)
    
    team_dic = {'id'            : teamid,
                'name'          : team.name,
                'introduction'  : team.introduction,
                'members'       : member_arr}
    
    return HttpResponse(json.dumps(team_dic), content_type="application/json")