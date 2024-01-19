from django.db import models
from django.db.models.fields import DateField
from datetime import date, datetime
from django.conf import settings

# Create your models here.


class Chat(models.Model):
    created_at = models.DateField(default=date.today)
    chat_name = models.CharField(max_length=200)
    
    
class Message(models.Model):
    text = models.CharField(max_length=500)
    created_at = models.DateField(default=date.today)
    created_time = models.CharField(max_length=5, default=datetime.now().strftime("%H:%M"), editable=False)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='chat_message_set', default=None, blank=True, null=True)
    # chat = Chat Klasse verknüpfen
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='author_message_set') # wenn der user gelöscht wird, wird auch diese Nachricht gelöscht.
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiver_message_set') # related name ist die Verknüpfung für unsere Datenbank
    # channel = models.ForeignKey(chat, on_delete=models.CASCADE, related_name='channel_message_set') #
    