from django.urls.conf import include, path
from .views import (
    AccountCreateView, 
    AccountListView, 
    CookieTokenObtainPairView, 
    MyAccountView, 
    LogoutView, 
    CookieTokenRefreshView,
    SendOTPView
)

urlpatterns = [
    path("auth/register", AccountCreateView.as_view(), name="register"),
    path("auth/send-otp", SendOTPView.as_view(), name="send_otp"),
    path("auth/token", CookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh", CookieTokenRefreshView.as_view(), name="token_refresh"),
    path("auth/logout", LogoutView.as_view(), name="logout"),
    path("users", AccountListView.as_view(), name="users_list"),
    path("users/me", MyAccountView.as_view(), name="my_account"),
]
