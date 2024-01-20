from django.shortcuts import render
from chat.models import Chat
from django.contrib.auth.decorators import login_required
# Create your views here.

@login_required(login_url="/login/")
def dashboard(request):
    if request.method == "GET":
        chatnames = Chat.objects.all()
        username = request.user.username
        return render(request, "dashboard/index.html", {"chats": chatnames, "username": username})
    if request.method == "POST":
        return render(request, "dashboard/index.html")