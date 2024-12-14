from django.urls.conf import include, path

urlpatterns = [
    path("", include('accounts.urls')),
    path("storage/", include("storage.urls")),
]
