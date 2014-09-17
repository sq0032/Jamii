from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.contrib import auth
from team.models import *
from inbox.models import *
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

def files(request, teamid):
    try:
        team    = Team.objects.filter( id = teamid )[0]
        files   = SharedFile.objects.filter( team = team )
    except IndexError:
        raise Http404
    
    files_arr = []
    for file in files:
        file_dic = {'id'        : file.id,
                    'name'      : file.name,
                    'link'      : file.link,
                    'icon'      : file.icon,
                    'uploader'  : file.uploader.username,
                    'upload_datetime': str(file.upload_datetime)}
        files_arr.append(file_dic)
        
    return HttpResponse(json.dumps(files_arr), content_type="application/json")

def file(request, teamid):
    if request.method=="DELETE":
        #card = TaskCard.objects.filter(id = cardid)[0]
        #card.delete()
        return HttpResponse(status = 200)
    elif request.method=="POST":
        try:
            team = Team.objects.filter( id = teamid )[0]
        except IndexError:
            raise Http404
        
        post = json.loads(request.body)
        file    = SharedFile( name = post['name'],
                              link = post['link'],
                              icon = post['icon'],
                              team = team,
                              uploader = request.user)
        file.save()
        
        file_dic = {'name'              : file.name,
                    'id'                : file.id,
                    'icon'              : file.icon,
                    'link'              : file.link,
                    'uploader'          : file.uploader.username,
                    'upload_datetime'   : str(file.upload_datetime)}
        
        return HttpResponse(json.dumps(file_dic), content_type="application/json")
    elif request.method=="PUT":
        return HttpResponse(teamid)
    return HttpResponse(teamid)

def msgboxes(request, teamid):
    if request.method=="GET":
        try:
            team        = Team.objects.filter( id = teamid )[0]
            msgboxes    = MsgBox.objects.filter( team = team )
        except IndexError:
            raise Http404

        msgbox_dic = []
        for msgbox in msgboxes:
            attendants = msgbox.attendants.all()
            temp_atts = []
            for attendant in attendants:
                temp_att = {'name'      : attendant.user.username,
                           'thumbnail' : attendant.thumbnail.name}
                temp_atts.append(temp_att)
                if attendant != request.user.jamiiuser:
                    msgbox_thumb = attendant.thumbnail.name
                   
            temp_msgbox = { 'id'             : msgbox.id,
                           'subject'        : msgbox.subject,
                           'create_datetime': str(msgbox.create_datetime),
                           'update_datetime': str(msgbox.update_datetime),
                           'attendants'     : temp_atts,
                           'thumbnail'      : msgbox_thumb}
            print temp_msgbox
            msgbox_dic.append(temp_msgbox)
        return HttpResponse(json.dumps(msgbox_dic), content_type="application/json")
    
    elif request.method=="POST":
        try:
            team        = Team.objects.filter( id = teamid )[0]
        except IndexError:
            raise Http404
        
        post        = json.loads(request.body)
        attendants  = JamiiUser.objects.filter(id__in = post['attendants'])
        
        msgbox      = MsgBox(subject    = post['subject'],
                             team       = team)
        msgbox.save()
        msgbox.attendants.add(*attendants)
        
        message     = Message(poster    = request.user.jamiiuser,
                              message   = post['message'],
                              msgbox    = msgbox)
        message.save()
        
        #Return new msgbox JSON
        temp_atts = []
        for attendant in attendants:
            temp_att = {'name'      : attendant.user.username,
                        'thumbnail' : attendant.thumbnail.name}
            temp_atts.append(temp_att)
            if attendant != request.user.jamiiuser:
                msgbox_thumb = attendant.thumbnail.name
                
        msgbox_dic = {  'id'             : msgbox.id,
                        'subject'        : msgbox.subject,
                        'create_datetime': str(msgbox.create_datetime),
                        'update_datetime': str(msgbox.update_datetime),
                        'attendants'     : temp_atts,
                        'thumbnail'      : msgbox_thumb}
            
        return HttpResponse(json.dumps(msgbox_dic), content_type="application/json")
    return HttpResponse('ok')


def members(request, teamid):
    if request.method=="GET":
        try:
            team        = Team.objects.filter( id = teamid )[0]
            members     = team.members.all();
        except IndexError:
            raise Http404
        
        members_dic = []
        for member in members:
            member_dic = {'name'      : member.username,
                          'thumbnail' : member.jamiiuser.thumbnail.name,
                          'id'        : member.id}
            members_dic.append(member_dic)
        return HttpResponse(json.dumps(members_dic), content_type="application/json")
    
    raise Http404
