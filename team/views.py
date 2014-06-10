from django.shortcuts import render
from django.http import HttpResponse
from django.contrib import auth

# Create your views here.
def test(request):
    print '123'
    return HttpResponse('team test')