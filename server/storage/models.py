from django.db import models
import uuid
from accounts.models import Account
import random
import string
from django.utils import timezone
from datetime import timedelta
from .managers import FolderManager
from django.conf import settings
import os
from .encryption import FileEncryption

def default_folder_expiry():
    return timezone.now() + timedelta(days=7)


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
    is_encrypted = models.BooleanField(default=True)

    def _encrypt_file(self):
        file_path = self.file.path
        encryption = FileEncryption()
        encrypted_path = encryption.encrypt_file(file_path)
        relative_path = os.path.relpath(encrypted_path, settings.MEDIA_ROOT)
        self.file.name = relative_path

    def save(self, *args, **kwargs):
        if self._state.adding and self.file and self.is_encrypted:
            super().save(*args, **kwargs)
            self._encrypt_file()

        super().save(*args, **kwargs)

    def get_decrypted_file(self):
        if not self.is_encrypted:
            with open(self.file.path, 'rb') as f:
                return f.read()
        
        encryption = FileEncryption()
        return encryption.decrypt_to_memory(self.file.path)
