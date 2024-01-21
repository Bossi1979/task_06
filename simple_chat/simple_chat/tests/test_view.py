from django.http import HttpRequest
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from login.utils import render_login_page
from django.http import HttpRequest
from django.shortcuts import render

class LoginViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.login_url = reverse("login_form") 
        self.username = "testuser"
        self.password = "testpassword"
        self.user = User.objects.create_user(username=self.username, password=self.password)

    def test_login_view(self):
        data = {"username": self.username, "password": self.password}
        response = self.client.post(self.login_url, data, format="json")
        self.assertEqual(response.status_code, 200)
        response_data = response.json()  
        self.assertIn("error", response_data)
        self.assertEqual(response_data['error'], '*Falscher Benutzername oder Passwort!')

class LoginRenderPageTest(TestCase):
    def test_render_login_page(self):
        # Create a mock request object
        request = HttpRequest()
        redirect_param = request.GET.get('next')
        response = render_login_page(request, redirect=redirect_param)
        self.assertEqual(response.status_code, 200)

        