from django.urls.conf import include, path
from .views import AccountCreateView, AccountListView, CookieTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("auth/register", AccountCreateView.as_view(), name="register"),
    path("auth/token", CookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("users", AccountListView.as_view(), name="users_list"),
]
