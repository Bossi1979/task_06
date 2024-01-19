from django.shortcuts import render
from .models import Message, Chat
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from datetime import date
from django.core import serializers
# Create your views here.


@login_required(login_url="/login/")
def index(request):
    if request.method == "GET":
        chat_messages = Message.objects.filter(chat__id=1)
        return render(request, "chat/index.html", {"messages": chat_messages})
    elif request.method == "POST":
        # Der Datenbank ein neue Nachricht hinzufügen
        print("post request: ", request.POST["textmessage"])
        myChat = Chat.objects.get(id=1)
        new_message = Message.objects.create(
            text=request.POST["textmessage"],
            chat=myChat,
            author=request.user,
            receiver=request.user,
        )
        serialized_obj = serializers.serialize("json", [new_message])
        return JsonResponse(serialized_obj[1:-1], safe=False)
    
def create_chat(request):
    if request.method == 'POST':
        new_chat = Chat.objects.create(
            created_at=date.today(),
            chat_name=request.POST["chat_name"],
        )
    serialized_obj = serializers.serialize("json", [new_chat])
    return JsonResponse(serialized_obj[1:-1], safe=False)
            