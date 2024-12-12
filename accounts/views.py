from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from .services import account_create
from api.errors import ApiErrorsMixin
from api.mixins import ApiAuthMixin
from .models import Account
from rest_framework.validators import UniqueValidator
# Create your views here.
class AccountCreateView(ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField(required=True)
        first_name = serializers.CharField(required=True)
        last_name = serializers.CharField(required=True)
        password = serializers.CharField(required=True)

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = account_create(**serializer.validated_data)
        return Response(status=status.HTTP_201_CREATED)

class AccountListView(ApiErrorsMixin, ApiAuthMixin, APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Account
            fields = ("id", "email", "first_name", "last_name")

    def get(self, request):
        # accounts = accounts_list(filters=filter_seriaizer.validated_data)
        accounts = Account.objects.all()

        data = self.OutputSerializer(instance=accounts, many=True).data
        return Response(data=data)
