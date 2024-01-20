from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User


# Create your views here.


def register_form(request):
    """
    View function for handling user registration.

    Parameters:
        - request: The HTTP request object.

    Returns:
        - POST: Redirects to the login page upon successful registration, renders the registration page with an error message otherwise.
        - GET: Renders the registration page.
    """
    if request.method == "POST":
        return handle_post_request(request)
    return render(request, 'register/index.html')


def handle_post_request(request):
    """
    Helper function to handle POST requests for user registration.

    Returns:
        - Redirects to the login page upon successful registration, renders the registration page with an error message otherwise.
    """
    username = request.POST.get("username")
    password = request.POST.get("password")
    confirm_password = request.POST.get("c_password")

    if is_valid_registration(username, password, confirm_password):
        return create_user_and_redirect(request, username, password)
    else:
        return render(
            request,
            'register/index.html',
            {"error": "Passwords do not match or username is empty"},
        )


def is_valid_registration(username, password, confirm_password):
    """
    Helper function to check if the registration inputs are valid.

    Returns:
        - True if the registration inputs are valid, False otherwise.
    """
    return len(username) >= 1 and password == confirm_password


def create_user_and_redirect(request, username, password):
    """
    Helper function to create a user and redirect to the login page.

    Returns:
        - Redirects to the login page upon successful user creation, renders the registration page with an error message otherwise.
    """
    if User.objects.filter(username=username).exists():
        return render(
            request,
            'register/index.html',
            {"error": "Username already exists"},
        )
    else:
        user = User.objects.create_user(username=username, password=password)
        if user:
            return HttpResponseRedirect("/login/")
        else:
            return render(
                request,
                'register/index.html',
                {"error": "Failed to create user"},
            )
