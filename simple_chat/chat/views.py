from django.shortcuts import render
from .models import Message, Chat
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from datetime import date
from django.core import serializers
from django.shortcuts import get_object_or_404
# Create your views here.


from django.shortcuts import render, get_object_or_404
from .models import Message, Chat
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from datetime import date
from django.core import serializers


# Create your views here.


@login_required(login_url="/login/")
def index(request):
    """
    View function for rendering the chat index page.

    - If the request method is GET, retrieve chat details and messages.
    - If the request method is POST, create a new message and return JSON response.

    Parameters:
        - request: The HTTP request object.

    Returns:
        - GET: Rendered HTML page with chat details and messages.
        - POST: JSON response containing the newly created message.
    """
    if request.method == "GET":
        return render_chat_index(request)
    elif request.method == "POST":
        return create_and_return_message(request)


def render_chat_index(request):
    """
    Helper function to render the chat index page for GET requests.

    Parameters:
        - request: The HTTP request object.

    Returns:
        - Rendered HTML page with chat details and messages.
    """
    channel_id = request.GET["channel_id"]
    chatnames = Chat.objects.all()
    chat = get_object_or_404(Chat, id=channel_id)
    chat_messages = Message.objects.filter(chat__id=channel_id)
    return render(request, "chat/index.html", {"messages": chat_messages, "channel_id": channel_id, "chats": chatnames, "channel_name": chat.chat_name})


def create_and_return_message(request):
    """
    Helper function to create a new message and return JSON response for POST requests.

    Parameters:
        - request: The HTTP request object.

    Returns:
        - JSON response containing the newly created message.
    """
    channel_id = request.POST["channel_id"]
    myChat = Chat.objects.get(id=channel_id)
    new_message = Message.objects.create(
        text=request.POST["textmessage"],
        chat=myChat,
        author=request.user,
        receiver=request.user,
        created_time=request.POST["created_time"],
    )
    serialized_obj = serializers.serialize("json", [new_message])
    return JsonResponse(serialized_obj[1:-1], safe=False)


def create_chat(request):
    """
    View function for creating a new chat.

    Parameters:
        - request: The HTTP request object.

    Returns:
        - JSON response containing the newly created chat.
    """
    if request.method == 'POST':
        new_chat = Chat.objects.create(
            created_at=date.today(),
            chat_name=request.POST["chat_name"],
        )
        serialized_obj = serializers.serialize("json", [new_chat])
        return JsonResponse(serialized_obj[1:-1], safe=False)
            