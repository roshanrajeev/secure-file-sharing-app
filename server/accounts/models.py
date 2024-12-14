from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import AccountManager
from django.core.exceptions import ValidationError
from django.utils import timezone
import random
import string
from django.conf import settings

# Create your models here.
class Account(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("user", "User"),
        ("guest", "Guest"),
    )

    username = None
    email = models.EmailField(max_length=254, unique=True, blank=False)
    first_name = models.CharField(max_length=36, blank=False)
    last_name = models.CharField(max_length=36, blank=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="user")

    otp_code = models.CharField(max_length=6, null=True, blank=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['first_name', 'last_name']

    def _clear_otp(self):
        self.otp_code = None
        self.otp_created_at = None
        self.save()

    def clean(self):
        if Account.objects.filter(email=self.email).exclude(pk=self.pk).exists():
            raise ValidationError({"email": "This email is already in use."})

        super().clean()

    def generate_otp(self):
        self.otp_code = ''.join(random.choices(string.digits, k=6))
        self.otp_created_at = timezone.now()
        self.save()
        return self.otp_code

    def verify_otp(self, code):
        if not self.otp_code:
            return False

        expiration_time = timezone.timedelta(minutes=10)
        is_expired = (timezone.now() - self.otp_created_at) > expiration_time

        if is_expired:
            return False

        # You can use default OTP in debug mode
        if settings.DEBUG and code == settings.DEFAULT_OTP:
            self._clear_otp()
            return True

        if self.otp_code != code:
            return False

        self._clear_otp()
        return True

