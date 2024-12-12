from django.urls import path
from .views import FolderCreateView, FileUploadView, FileListView, FolderDownloadView

urlpatterns = [
    path("folders/create", FolderCreateView.as_view(), name="create_folder"),
    path("folders/<str:folder_uid>/files/upload", FileUploadView.as_view(), name="upload_file"),
    path("folders/<str:folder_uid>/files", FileListView.as_view(), name="list_files"),
    path("folders/<str:folder_uid>/files/download", FolderDownloadView.as_view(), name="download_folder"),
]
