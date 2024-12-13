from django.urls import path
from .views import FolderCreateView, FileUploadView, FileListView, FolderDownloadView, BulkFileUploadView, FolderSharedWithMeView, MySharedFoldersView

urlpatterns = [
    path("folders/create", FolderCreateView.as_view(), name="create_folder"),
    path("folders/<str:folder_uid>/files/upload", FileUploadView.as_view(), name="upload_file"),
    path("folders/<str:folder_uid>/files/bulk_upload", BulkFileUploadView.as_view(), name="bulk_upload_file"),
    path("folders/<str:folder_uid>/files", FileListView.as_view(), name="list_files"),
    path("folders/<str:folder_uid>/files/download", FolderDownloadView.as_view(), name="download_folder"),
    path("folders/shared_with_me", FolderSharedWithMeView.as_view(), name="shared_with_me"),
    path("folders/my_shared_folders", MySharedFoldersView.as_view(), name="my_shared_folders"),
]
