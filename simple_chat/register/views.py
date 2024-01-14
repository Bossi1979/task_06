from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
# Create your views here.


def register_form(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        confirmPassword = request.POST.get("c_password")
        print('register request')
        if len(username) >= 1 and password == confirmPassword:
            # Überprüfen, ob der Benutzername bereits existiert
            if User.objects.filter(username=username).exists():
                return render(
                    request,
                    'register/index.html',
                    {"error": "Username already exists"},
                )
            else:
                # Passwort wird automatisch gehasht
                user = User.objects.create_user(username=username, password=password)
                if user:
                    return HttpResponseRedirect("/login/")
                else:
                    return render(
                        request,
                        'register/index.html',
                        {"error": "Failed to create user"},
                    )
        else:
            return render(
                request,
                'register/index.html',
                {"error": "Passwords do not match or username is empty"},
            )
    return render(request, 'register/index.html')
    # return render(request, 'register/index.html')
