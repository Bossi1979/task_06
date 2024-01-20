from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login


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


def handle_post_request(request):
    """
    Helper function to handle POST requests for user login.

    Returns:
        - JSON response with success message and redirect URL or error message.
    """
    user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
    if user:
        login(request, user)
        return JsonResponse({'error': 'none', 'url': '/dashboard/'})
    else:
        return JsonResponse({'error': '*Incorrect username or password'})


def render_login_page(request, redirect):
    """
    Helper function to render the login page for GET requests.

    Parameters:
        - request: The HTTP request object.
        - redirect: Optional redirect parameter.

    Returns:
        - Renders the login page with an optional redirect parameter.
    """
    return render(request, 'login/index.html', {'redirect': redirect})

    
