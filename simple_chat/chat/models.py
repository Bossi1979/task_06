from django.db import models
from django.db.models.fields import DateField
from datetime import date
from django.conf import settings

# Create your models here.


class Chat(models.Model):
    """
    Ein Modell, das einen Chat repräsentiert.

    Attribute:
        - created_at (DateField): Das Erstellungsdatum des Chats.
        - chat_name (CharField): Der Name des Chats mit maximal 200 Zeichen.
    """
    created_at = models.DateField(default=date.today)
    chat_name = models.CharField(max_length=200, default='')
    
    
class Message(models.Model):
    """
    Ein Modell, das eine Nachricht repräsentiert.

    Attribute:
        - text (CharField): Der Text der Nachricht mit maximal 500 Zeichen.
        - created_at (DateField): Das Erstellungsdatum der Nachricht.
        - created_time (CharField): Die Uhrzeit der Nachricht mit maximal 5 Zeichen.
        - chat (ForeignKey): Die Verknüpfung zu einem Chat-Objekt.
        - author (ForeignKey): Die Verknüpfung zu einem Benutzer als Autor der Nachricht.
        - receiver (ForeignKey): Die Verknüpfung zu einem Benutzer als Empfänger der Nachricht.
    """
    text = models.CharField(max_length=500)
    created_at = models.DateField(default=date.today)
    created_time = models.CharField(max_length=5)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='chat_message_set', default=None, blank=True, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='author_message_set') # wenn der user gelöscht wird, wird auch diese Nachricht gelöscht.
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiver_message_set') # related name ist die Verknüpfung für unsere Datenbank
    

    