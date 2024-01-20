from django.contrib import admin
from .models import Message
from .models import Chat

# Register your models here.

# Ansicht in der Admin Console als Tabelle:
class MessageAdmin(admin.ModelAdmin):    
    fields = ('chat', 'text','created_at', 'created_time', 'author', 'receiver')    
    list_display = ('created_at', 'author', 'created_time', 'text', 'receiver')    
    search_fields = ('text',)# Register your models here.admin.site.register(Message, MessageAdmin)Copyright © 2022 Developer Akademie GmbH
    
    
# class ChatAdmin(admin.ModelAdmin): 
#     fields = ('channel_created_at')
#     list_display = ('channel_created_at')

# Register your models here.
admin.site.register(Message, MessageAdmin)
admin.site.register(Chat)
