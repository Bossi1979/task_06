"""
URL configuration for simple_chat project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from chat.views import index, create_chat
from login.views import login_form
from dashboard.views import dashboard
from register.views import register_form
from django.contrib.auth.views import LogoutView
from django.shortcuts import redirect
from django.contrib.auth import logout


def logout_and_redirect(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect('login_form')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', index, name='index'),
    path('login/', login_form, name='login_form'),
    path('dashboard/', dashboard, name='dashboard'),
    path('register/', register_form, name='register_form'),
    path('create_chat/', create_chat, name='create_chat'),
    path('logout/', LogoutView.as_view(next_page='/login/'), name='logout'),
    path('', logout_and_redirect),
]



