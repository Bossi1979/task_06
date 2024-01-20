from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from .utils import *


# Create your views here.


def login_form(request):
    """
    View function for handling user login with JSON response.

    Parameters:
        - request: The HTTP request object.

    Returns:
        - POST: JSON response with success message and redirect URL or error message.
        - GET: Renders the login page with an optional redirect parameter.
    """
    redirect = request.GET.get('next')
    if request.method == 'POST':
        return handle_post_request(request)
    elif request.method == 'GET':
        return render_login_page(request, redirect)




    
