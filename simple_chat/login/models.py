from django.db import models


# Create your models here.


class LoginClass(models.Model):
    """
    Model representing user login credentials.

    Attributes:
        - username (CharField): The username for the login, with a maximum length of 100 characters.
        - password (CharField): The password for the login, with a maximum length of 100 characters.
    """
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)