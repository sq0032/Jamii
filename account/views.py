from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def user(request):
    user = "user test"
    
    return HttpResponse('user test')