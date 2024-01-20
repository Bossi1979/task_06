from django.shortcuts import render
from .models import Message, Chat
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from datetime import date
from django.core import serializers
from django.shortcuts import get_object_or_404
# Create your views here.


@login_required(login_url="/login/")
def index(request):
    if request.method == "GET":
        channel_id = request.GET["channel_id"]
        chatnames = Chat.objects.all()
        chat = get_object_or_404(Chat, id=channel_id)
        chat_messages = Message.objects.filter(chat__id=channel_id)
        return render(request, "chat/index.html", {"messages": chat_messages, "channel_id": channel_id, "chats": chatnames, "channel_name": chat.chat_name})
    elif request.method == "POST":
        # Der Datenbank ein neue Nachricht hinzufügen
        print("post request: ", request.POST["textmessage"])
        channel_id = request.POST["channel_id"]
        
        myChat = Chat.objects.get(id=channel_id)
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
            