from django.urls.conf import include, path
from .views import AccountCreateView

urlpatterns = [
    path("auth/register", AccountCreateView.as_view(), name="register"),
]
