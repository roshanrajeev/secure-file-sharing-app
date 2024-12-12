from .models import Account

def account_create(*, email: str, first_name: str, last_name: str, password: str) -> Account:
    account = Account.objects.create_user(email=email, first_name=first_name, last_name=last_name, password=password)
    return account
