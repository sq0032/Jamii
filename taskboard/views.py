from django.shortcuts import render
from django.http import HttpResponse
from taskboard.models import *
import json

# Create your views here.
def test(request):
    return HttpResponse('taskboard')

def cards(request):
    if request.method=="GET":
        cards = TaskCard.objects.all();
        data = []
        for card in cards:
            card_dic = {'name'  : card.name,
                        'id'    : card.id,
                        'order' : card.order}
            data.append(card_dic) 
        return HttpResponse(json.dumps(data), content_type="application/json")
    elif request.method=="UPDATE":
        print 'update'
        return HttpResponse('update')
    elif request.method=="POST":
        print 'post'
        return HttpResponse('post')
    elif request.method=="PUT":
        print 'put'
        return HttpResponse('post')
    
def card(request, cardid):
    if request.method=="PUT":
        post = json.loads(request.body)
        id   = post['id']
        order= post['order']
        listid = post['list']
        
        card = TaskCard.objects.filter(id = id)[0]
        card.order  = order
        card.list   = TaskList.objects.filter(id = listid)[0]
        card.save()
        return HttpResponse(status = 200)
    return HttpResponse('ok')

def list(request, listid):
    if request.method=="GET":
        tasklist    = TaskList.objects.filter(id=listid)[0]
        cards       = tasklist.taskcard_set.all()
        data = []
        for card in cards:
            card_dic = {'name'  : card.name,
                        'id'    : card.id,
                        'order' : card.order}
            data.append(card_dic) 
        return HttpResponse(json.dumps(data), content_type="application/json")
    
    if request.method=="PUT":
        cards = json.loads(request.body)['cards']
        print cards
        for card in cards:
            id      = card['id']
            order   = card['order']
            
            c       = TaskCard.objects.filter(id=id)[0]
            print order
            print c.order
            c.order = order
            c.list  = TaskList.objects.filter(id=listid)[0]
            print c.order
            c.save()
            print c.order
            print 'save'
        
        #card = TaskCard.objects.filter(id = id)[0]
        #card.order  = order
        #card.list   = TaskList.objects.filter(id = listid)[0]
        #card.save()
        return HttpResponse(status = 200)
    return HttpResponse('ok')


def board(request, teamid):
    if request.method=="GET":
        board = TaskBoard.objects.filter(team_id = teamid)[0]
        lists = board.tasklist_set.all()
        data = {'id'    : board.id,
                'name'  : board.name,
                'lists' : []}
        for list in lists:
            list_dic = {'id'    : list.id,
                        'name'  : list.name,
                        'order' : list.order,
                        'cards' : []}
            cards = list.taskcard_set.all()
            for card in cards:
                card_dic = {'id'    : card.id,
                            'name'  : card.name,
                            'order' : card.order}
                list_dic['cards'].append(card_dic)
            data['lists'].append(list_dic)
        return HttpResponse(json.dumps(data), content_type="application/json")
    return HttpResponse('ok')

"""
def lists(request):
    if request.method=="GET":
        lists = TaskList.objects.all();
        data = []
        for list in cards:
            list_dic = {'name'  : card.name,
                        'id'    : card.id,
                        'order' : card.order}
            data.append(list_dic) 
        return HttpResponse(json.dumps(data), content_type="application/json")
"""