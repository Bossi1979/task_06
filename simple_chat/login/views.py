from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login

# Create your views here.

def login_form(request):
    redirect = request.GET.get('next')
    if request.method == 'POST':
       user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
       if user:
           login(request, user)
           return HttpResponseRedirect('/chat/')
       else:
           return render(request, 'login/index.html', {'wrongPassword': True, 'redirect': redirect})
    return render(request, 'login/index.html', {'redirect': redirect})

