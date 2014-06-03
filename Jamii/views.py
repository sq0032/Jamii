from django.shortcuts import render
from django.http import HttpResponse
from django import forms
from django.contrib import auth

from models import JamiiIntroduction

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


def main(request):
    if request.user.is_authenticated():
        return render(request, 'jamii.html')
    else:
        login = True
        loginform = LoginForm()
        intro = JamiiIntroduction.objects.filter(id=1)
        if intro.count() > 0:
            introduction = intro[0].intro   
        if request.method=="POST":
            username = request.POST.get('username','')
            password = request.POST.get('password','')
            user = auth.authenticate(username=username, password=password)
            if user is not None and user.is_active:
                auth.login(request, user)
                return render(request, 'jamii.html')
            else:
                is_invalid = True
        return render(request, 'login.html', locals())