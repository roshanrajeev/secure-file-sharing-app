from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from api.errors import ApiErrorsMixin
from api.mixins import ApiAuthMixin
from .models import Folder, File
from rest_framework.parsers import FormParser, MultiPartParser
from .services import create_file, create_folder

# Create your views here.
class FileUploadView(ApiErrorsMixin, ApiAuthMixin, APIView):
    parser_classes = [FormParser, MultiPartParser]

    class InputSerializer(serializers.Serializer):
        file = serializers.FileField(required=True)
        folder_uid = serializers.UUIDField(required=True)

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        create_file(**serializer.validated_data)
        return Response(status=status.HTTP_200_OK)

class FolderCreateView(ApiErrorsMixin, ApiAuthMixin, APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Folder
            fields = ["uid"]

    def post(self, request):
        folder = create_folder()
        data = self.OutputSerializer(instance=folder).data
        return Response(data, status=status.HTTP_201_CREATED)
