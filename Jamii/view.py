'''
Created on 2014/5/30

@author: squall
'''

from django.http import Http404, HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render_to_response
import datetime

def hello(request):
    return HttpResponse("Hello World")

def current_datatime(request):
    current_data = datetime.datetime.now()
    return render_to_response("current_time.html", locals())

def hours_ahead(request, offset):
    try:
        offset = int(offset)
    except ValueError:
        raise Http404()
    dt = datetime.datetime.now() + datetime.timedelta(hours=offset)
    #assert False
    html = "<html><body>In %s hour(s), it will be %s.</body></html>" % (offset, dt)
    return HttpResponse(html)


def template(request):
    athlete_list = [{'name':'AAA'},{'name':'CCC'},{'name':'BBB'}]
    x = 3
    return render_to_response('index.html',locals())

def test(request):
    return HttpResponse('Hello')

from django import forms
class ContactForm(forms.Form):
    subject = forms.CharField()
    email = forms.EmailField(required=False)
    message = forms.CharField(widget=forms.Textarea)

from django.shortcuts import render
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
    else:
        form = ContactForm()
    return render(request, 'contact.html', locals())

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput())

from django.shortcuts import redirect
from django.contrib import auth
def login(request):
    if request.method == 'GET':
        if request.user.is_authenticated():
            return redirect('/admin/')
        loginform = LoginForm()
    elif request.method == 'POST':
        username = request.POST.get('username','')
        password = request.POST.get('password','')
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            return redirect('/admin/')
        else:
            is_invalid = True
            loginform = LoginForm()
    return render(request, 'login.html', locals())

def main(request):
    if request.user.is_authenticated():
        return render(request, 'base.html', locals())
    else:
        loginform = LoginForm()
        if request.method == 'POST':
            username = request.POST.get('username','')
            password = request.POST.get('password','')
            user = auth.authenticate(username=username, password=password)
            if user is not None and user.is_active:
                auth.login(request, user)
                return render(request, 'base.html', locals())
            else:
                is_invalid = True
        return render(request, 'login.html', locals())
    