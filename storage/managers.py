from django.db import models
from django.utils import timezone


class FolderQuerySet(models.QuerySet):
    def active(self):
        return self.filter(
            models.Q(folder_expiry__isnull=True) | models.Q(folder_expiry__gt=timezone.now())
        )


class FolderManager(models.Manager):
    def get_queryset(self):
        return FolderQuerySet(self.model, using=self._db)

    def active(self):
        return self.get_queryset().active()
