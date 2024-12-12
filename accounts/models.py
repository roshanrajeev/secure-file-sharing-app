from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import AccountManager
from django.core.exceptions import ValidationError

# Create your models here.
class Account(AbstractBaseUser, PermissionsMixin):
    username = None

    email = models.EmailField(max_length=254, unique=True, blank=False)
    first_name = models.CharField(max_length=36, blank=False)
    last_name = models.CharField(max_length=36, blank=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['first_name', 'last_name']

    def clean(self):
        if Account.objects.filter(email=self.email).exclude(pk=self.pk).exists():
            raise ValidationError({"email": "This email is already in use."})

        super().clean()
