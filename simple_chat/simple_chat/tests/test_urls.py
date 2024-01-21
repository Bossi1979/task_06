from django.test import SimpleTestCase
from django.urls import reverse, resolve
from chat.views import index, create_chat
from login.views import login_form
from dashboard.views import dashboard
from register.views import register_form
from django.contrib.auth.views import LogoutView
from django.contrib import admin

class TestUrls(SimpleTestCase):

    def test_admin_url_resolves(self):
        url = reverse('admin:login')
        self.assertEqual(resolve(url).func, admin.site.login)

    def test_index_url_resolves(self):
        url = reverse('index')
        self.assertEqual(resolve(url).func, index)

    def test_login_form_url_resolves(self):
        url = reverse('login_form')
        self.assertEqual(resolve(url).func, login_form)

    def test_dashboard_url_resolves(self):
        url = reverse('dashboard')
        self.assertEqual(resolve(url).func, dashboard)

    def test_register_form_url_resolves(self):
        url = reverse('register_form')
        self.assertEqual(resolve(url).func, register_form)

    def test_create_chat_url_resolves(self):
        url = reverse('create_chat')
        self.assertEqual(resolve(url).func, create_chat)