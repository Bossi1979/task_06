from django.shortcuts import render

# Create your views here.


def register_form(request):
    return render(request, 'register/index.html')