from django.contrib.auth.models import BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, email, password, **other_fields):
        if not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)
        account = self.model(email=email, **other_fields)
        account.set_password(password)

        account.full_clean()
        account.save()
        return account
