# Generated by Django 5.0.1 on 2024-01-20 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_chat_chat_name_alter_message_created_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='created_time',
            field=models.CharField(max_length=5),
        ),
    ]
