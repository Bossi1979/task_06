from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import LoginClass

# Create your views here.

def login_form1(request):
    redirect = request.GET.get('next')
    if request.method == 'POST':
       user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
       if user:
           login(request, user)
           return HttpResponseRedirect('/chat/')
       else:
           return render(request, 'login/index.html', {'wrongPassword': True, 'redirect': redirect})
    return render(request, 'login/index.html', {'redirect': redirect})


def login_form(request):
    redirect = request.GET.get('next')
    if request.method == 'POST':
       user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
       if user:
           login(request, user)
           response_data = {
                'error': 'none',
                'url': '/dashboard/',
            }
           return JsonResponse(response_data)
       else:
           response_data = {
                'error': '*Benutzername oder Passwort falsch',
            }
           return JsonResponse(response_data)

    elif request.method == 'GET':
        return render(request, 'login/index.html', {'redirect': redirect})
    
    
    
def loginDataCorrect(request):
    login(request, user)
    response_data = {
        'error': 'none',
        'url': '/chat/',
    }
    return JsonResponse(response_data)
    
