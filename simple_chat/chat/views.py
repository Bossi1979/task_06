from django.shortcuts import render, get_object_or_404
from .models import Message, Chat
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from datetime import date
from django.core import serializers
from .utils import *


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
            