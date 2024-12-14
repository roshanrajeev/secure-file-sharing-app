from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.authentication import CookieJWTAuthentication


class ApiAuthMixin:
    authentication_classes = (CookieJWTAuthentication, )
    permission_classes = (IsAuthenticated, )


class ApiAnonymousMixin:
    authentication_classes = (CookieJWTAuthentication, )
    permission_classes = (AllowAny, )