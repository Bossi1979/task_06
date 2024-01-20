from django.shortcuts import render
from chat.models import Chat

# Create your views here.


def dashboard(request):
    if request.method == "GET":
        chatnames = Chat.objects.all()
        return render(request, "dashboard/index.html", {"chats": chatnames})
    if request.method == "POST":
        return render(request, "dashboard/index.html")