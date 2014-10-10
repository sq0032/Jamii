from django import forms
from django.forms import ModelForm
from account.models import *

class UploadFileForm(forms.Form):
    file    = forms.FileField()
    
class JamiiUserModelForm(ModelForm):
    class Meta:
        model   = JamiiUser
        fields  = ['thumbnail']