from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from api.errors import ApiErrorsMixin
from api.mixins import ApiAuthMixin
from .models import Folder, File
from rest_framework.parsers import FormParser, MultiPartParser
from .services import create_file, create_folder, bulk_create_files
from django.http import Http404
from django.core.files.storage import default_storage
from django.http import FileResponse
from accounts.models import Account
import zipfile
from io import BytesIO

# Create your views here.
class FileUploadView(ApiErrorsMixin, ApiAuthMixin, APIView):
    parser_classes = [FormParser, MultiPartParser]

    class InputSerializer(serializers.Serializer):
        file = serializers.FileField(required=True)

    def post(self, request, folder_uid):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        create_file(folder_uid=folder_uid, **serializer.validated_data)
        return Response(status=status.HTTP_200_OK)


class BulkFileUploadView(ApiErrorsMixin, APIView):
    parser_classes = [FormParser, MultiPartParser]

    class InputSerializer(serializers.Serializer):
        files = serializers.ListField(child=serializers.FileField(), required=True)

    def post(self, request, folder_uid):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        bulk_create_files(folder_uid=folder_uid, **serializer.validated_data)
        return Response(status=status.HTTP_200_OK)


class FolderCreateView(ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        share_with_all = serializers.BooleanField(required=False)
        allowed_emails = serializers.ListField(child=serializers.EmailField(), required=False)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Folder
            fields = ["uid"]

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        folder = create_folder(user=request.user, **serializer.validated_data)
        data = self.OutputSerializer(instance=folder).data
        return Response(data, status=status.HTTP_201_CREATED)


class FileListView(ApiErrorsMixin, APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = File
            fields = ["uid", "name", "created_at"]

    def get(self, request, folder_uid):
        folder = Folder.objects.get(uid=folder_uid)
        if not folder.share_with_all and request.user not in folder.shared_with.all() and request.user != folder.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        files = folder.files.all()
        data = self.OutputSerializer(instance=files, many=True).data
        return Response(data, status=status.HTTP_200_OK)


class FolderDownloadView(ApiErrorsMixin, APIView):
    def get(self, request, folder_uid):
        folder = Folder.objects.get(uid=folder_uid)
        if not folder.share_with_all and request.user not in folder.shared_with.all() and request.user != folder.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        files = folder.files.all()

        if len(files) == 1:
            file_obj = files[0].file
            file_path = default_storage.path(file_obj.name)
            response = FileResponse(open(file_path, "rb"), as_attachment=True, filename=file_obj.name.split("/")[-1])   
            response["Access-Control-Expose-Headers"] = "Content-Disposition"
            return response
        
        elif len(files) > 1:
            zip_buffer = BytesIO()
            with zipfile.ZipFile(zip_buffer, "w") as zip_file:
                for file_obj in files:
                    file_path = default_storage.path(file_obj.file.name)
                    zip_file.write(file_path, arcname=file_obj.file.name.split("/")[-1])
            zip_buffer.seek(0)

            response = FileResponse(zip_buffer, as_attachment=True, filename=f"{folder_uid}_files.zip")
            response["Access-Control-Expose-Headers"] = "Content-Disposition"
            return response

        raise Http404("No files found in the folder.")


class FolderSharedWithMeView(ApiErrorsMixin, ApiAuthMixin, APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class AccountSerializer(serializers.ModelSerializer):
            class Meta:
                model = Account
                fields = ["id", "first_name", "last_name", "email"]

        user = AccountSerializer(read_only=True, allow_null=True)

        class Meta:
            model = Folder
            fields = ["uid", "created_at", "user"]


    def get(self, request):
        folders = request.user.folders_shared_with_me.all()
        data = self.OutputSerializer(instance=folders, many=True).data
        return Response(data, status=status.HTTP_200_OK)


class MySharedFoldersView(ApiErrorsMixin, ApiAuthMixin, APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class AccountSerializer(serializers.ModelSerializer):
            class Meta:
                model = Account
                fields = ["id", "first_name", "last_name", "email"]

        shared_with = AccountSerializer(read_only=True, many=True)

        class Meta:
            model = Folder
            fields = ["uid", "created_at", "shared_with", "share_with_all"]

    def get(self, request):
        folders = request.user.folders.all()
        data = self.OutputSerializer(instance=folders, many=True).data
        return Response(data, status=status.HTTP_200_OK)

