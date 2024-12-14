from django.db import models
import uuid
from accounts.models import Account
import random
import string
from django.utils import timezone
from datetime import timedelta
from .managers import FolderManager

def default_folder_expiry():
    return timezone.now() + timedelta(minutes=1)


class Folder(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="folders", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    share_with_all = models.BooleanField(default=True)
    shared_with = models.ManyToManyField(
        Account, related_name="folders_shared_with_me", blank=True
    )
    folder_expiry = models.DateTimeField(null=True, blank=True, default=default_folder_expiry)

    objects = FolderManager()

    def is_expired(self):
        return self.folder_expiry and self.folder_expiry < timezone.now()


class File(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to="uploads/")
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name="files")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
