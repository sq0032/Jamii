from django.shortcuts import render
from django.http import HttpResponse
from django import template
from account.models import JamiiUser
from account.form import JamiiUserModelForm
import json

# Create your views here.
def test(request):
    if request.method == 'POST':
        jamiiuserform = JamiiUserModelForm(request.POST, request.FILES, instance=request.user.jamiiuser)
        #assert False
        if jamiiuserform.is_valid():
            #request.jamiiuser.
            jamiiuserform.save()
            return HttpResponse('success')
    else:
        jamiiuserform = JamiiUserModelForm()
    return render(request, 'test.html', locals())

def user(request):
    if request.user.is_authenticated():
    #user        = JamiiUser.objects.all()[0]
    #thumbnail   = user.thumbnail.url
    #c           = template.Context({'thumbnail':thumbnail})
    #t           = template.Template('<img src={{MEDIA_URL}}{{thumbnail}}/>')
    #html        = t.render(c)
        data = {}
        data['id']          = request.user.id
        data['name']        = request.user.username
        data['first_name']  = request.user.first_name
        data['last_name']   = request.user.last_name
        data['email']       = request.user.email
        data['phone']       = request.user.jamiiuser.phone
        data['thumbnail']   = request.user.jamiiuser.thumbnail.url
        return HttpResponse(json.dumps(data), content_type="application/json")
    else:
        return HttpResponse('This user is not existed')
    return HttpResponse(json.dumps(data), content_type="application/json")

def users(request):
    user = JamiiUser.objects.all()
    return HttpResponse('test')

def editProfile(request):
    if request.method == 'POST':
        jamiiuserform = JamiiUserModelForm(request.POST, request.FILES, instance=request.user.jamiiuser)
        if jamiiuserform.is_valid():
            jamiiuserform.save()
            return HttpResponse('success')
    else:
        jamiiuserform = JamiiUserModelForm()
    return render(request, 'test.html', locals())