from django.urls import path
from .views import FolderCreateView, FileUploadView

urlpatterns = [
    path("folders/create", FolderCreateView.as_view(), name="create_folder"),
    path("files/upload", FileUploadView.as_view(), name="upload_file"),
]
