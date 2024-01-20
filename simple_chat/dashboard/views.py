from django.shortcuts import render
from chat.models import Chat
from django.contrib.auth.decorators import login_required


# Create your views here.


@login_required(login_url="/login/")
def dashboard(request):
    """
    View function for rendering the dashboard page.

    - If the request method is GET, retrieve chat details.
    - If the request method is POST, perform additional actions (if needed) and return the dashboard page.

    Parameters:
        - request: The HTTP request object.

    Returns:
        - Rendered HTML page with chat details and username.
    """
    if request.method == "GET":
        return render_dashboard_get(request)
    elif request.method == "POST":
        return render_dashboard_post(request)


def render_dashboard_get(request):
    """
    Helper function to render the dashboard page for GET requests.

    Parameters:
        - request: The HTTP request object.

    Returns:
        - Rendered HTML page with chat details and username.
    """
    chatnames = Chat.objects.all()
    username = request.user.username
    return render(request, "dashboard/index.html", {"chats": chatnames, "username": username})


def render_dashboard_post(request):
    """
    Helper function to perform additional actions (if needed) and render the dashboard page for POST requests.

    Parameters:
        - request: The HTTP request object.

    Returns:
        - Rendered HTML page for the dashboard.
    """
    # Perform additional actions for POST requests if needed
    return render(request, "dashboard/index.html")