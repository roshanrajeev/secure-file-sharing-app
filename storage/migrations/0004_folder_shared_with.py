# Generated by Django 5.1.4 on 2024-12-13 09:01

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0003_folder_user'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='shared_with',
            field=models.ManyToManyField(blank=True, related_name='folders_shared_with_me', to=settings.AUTH_USER_MODEL),
        ),
    ]