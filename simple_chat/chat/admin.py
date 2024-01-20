from django.contrib import admin
from .models import Message
from .models import Chat


# Register your models here.


class MessageAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Message model.

    Fields:
        - chat: The associated chat of the message.
        - text: The text content of the message.
        - created_at: The creation date of the message.
        - created_time: The time of the message.
        - author: The author of the message.
        - receiver: The receiver of the message.

    List Display:
        - created_at: Displayed in the list view.
        - author: Displayed in the list view.
        - created_time: Displayed in the list view.
        - text: Displayed in the list view.
        - receiver: Displayed in the list view.

    Search Fields:
        - text: Enables search functionality based on the message text.
    """    
    fields = ('chat', 'text','created_at', 'created_time', 'author', 'receiver')    
    list_display = ('created_at', 'author', 'created_time', 'text', 'receiver')    
    search_fields = ('text',)
    

# Register your models here.
admin.site.register(Message, MessageAdmin)
admin.site.register(Chat)
