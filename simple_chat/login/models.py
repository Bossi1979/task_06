from django.db import models
from django.conf import settings

# Create your models here.

class LoginClass(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)