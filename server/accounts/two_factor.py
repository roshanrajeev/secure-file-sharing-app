from django.core.mail import send_mail
from django.conf import settings
from .models import Account

def generate_and_send_otp(user: Account) -> str:
    code = user.generate_otp()

    # send_mail(
    #     'Your Login Verification Code',
    #     f'Your verification code is: {code}',
    #     settings.DEFAULT_FROM_EMAIL,
    #     [user.email],
    #     fail_silently=False,
    # )

    return code

def verify_otp(user: Account, code: str) -> bool:
    return user.verify_otp(code)