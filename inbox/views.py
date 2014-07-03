from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
from inbox.models import *
from account.models import *
from Jamii.libs import datetime_to_milliseconds
import json

# Create your views here.
def test(request):
    return HttpResponse("inbox")

def message(request):#, msgbox_id):
#    msgbox      = MsgBox.objects.filter(id=msgbox_id)
    msg         = Message.objects.all()[0]
    msg_poster  = msg.poster;
    msg_dic     = {'poster'     : msg.poster.user.username,
                   'thumbnail'  : msg.poster.thumbnail.name,
                   'message'    : msg.message,
                   'date_time'  : str(msg.create_datetime)
                   }
    
    return HttpResponse(json.dumps(msg_dic), content_type="application/json")

def messages(request, msgbox_id):
    #Check if target msgbox exists
    try:
        msgbox      = MsgBox.objects.filter(id = msgbox_id)[0]
    except IndexError:
        return HttpResponse({}, content_type="application/json")

    #If the request is asking for data...
    if request.method == 'GET':
        messages    = msgbox.message_set.all()
        
        messages_dic = []
        for message in messages:
            temp_dic = {'poster'            : message.poster.user.username,
                        'thumbnail'         : message.poster.thumbnail.name,
                        'message'           : message.message,
                        'create_datetime'   : str(message.create_datetime)}
            messages_dic.append(temp_dic)
        return HttpResponse(json.dumps(messages_dic), content_type="application/json")
    
    #If the request is sending a message...
    elif request.method == 'POST':
        post    = json.loads(request.body)
        poster  = JamiiUser.objects.filter(user = request.user)[0]
        message = Message(poster    = poster,
                          message   = post['message'],
                          msgbox    = msgbox)
        message.save()
        message_dic = {'poster'            : message.poster.user.username,
                       'thumbnail'         : message.poster.thumbnail.name,
                       'message'           : message.message,
                       'create_datetime'   : str(message.create_datetime)}
        #print message
        return HttpResponse(json.dumps(message_dic), content_type="application/json")        


#GET: fetch message box list
#POST: create a new message box with a new piece of message
def msgboxes(request):
    if request.method == 'GET':
        print request.user
        msgboxes  = MsgBox.objects.filter(attendants = request.user.jamiiuser).extra(order_by = ['-update_datetime'])
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
    
    elif request.method == 'POST':
        post        = json.loads(request.body)
        attendants  = JamiiUser.objects.filter(id__in = post['attendants'])
        
        msgbox      = MsgBox(subject    = post['subject'])
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

#fetch user tags for new inbox message attendants
def usertag(request):
    users = JamiiUser.objects.filter().exclude(user = request.user)
    
    users_dic = []
    for user in users:
        user_dic = {'name'      : user.user.username,
                    'thumbnail' : user.thumbnail.name,
                    'id'        : user.id}
        users_dic.append(user_dic)
    
    return HttpResponse(json.dumps(users_dic), content_type="application/json")