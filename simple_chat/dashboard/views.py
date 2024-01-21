from django.shortcuts import render
from chat.models import Chat
from django.contrib.auth.decorators import login_required
from .utils import *


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
