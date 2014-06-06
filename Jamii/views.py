from django.shortcuts import render
from django.http import HttpResponse
from django import forms
from django.contrib import auth

from models import JamiiIntroduction

#test function (you can delete it anytime)
def test(request):
    return render(request,'test.html',locals())

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


def main(request):
    if request.user.is_authenticated():
        return render(request, 'jamii.html')
    else:
        if request.method=="POST":
            username = request.POST.get('username','')
            password = request.POST.get('password','')
            user = auth.authenticate(username=username, password=password)
            if user is not None and user.is_active:
                auth.login(request, user)
                return render(request, 'jamii.html')
            else:
                is_invalid = True
        login = True
        loginform = LoginForm()
        intro = JamiiIntroduction.objects.filter(id=1)
        if intro.count() == 1:
            introduction        = intro[0].intro
            introduction_video  = intro[0].video
        return render(request, 'login.html', locals())