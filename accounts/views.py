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
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

# Create your views here.
class AccountCreateView(ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField(required=True)
        first_name = serializers.CharField(required=True)
        last_name = serializers.CharField(required=True)
        password = serializers.CharField(required=True)
        role = serializers.ChoiceField(choices=Account.ROLE_CHOICES, required=False)

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = account_create(**serializer.validated_data)
        return Response(status=status.HTTP_201_CREATED)


class AccountListView(ApiErrorsMixin, ApiAuthMixin, APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Account
            fields = ("id", "email", "first_name", "last_name", "role")

    def get(self, request):
        # accounts = accounts_list(filters=filter_seriaizer.validated_data)
        accounts = Account.objects.all()

        data = self.OutputSerializer(instance=accounts, many=True).data
        return Response(data=data)


class MyAccountView(ApiErrorsMixin, ApiAuthMixin, APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Account
            fields = ("id", "email", "first_name", "last_name", "role")

    def get(self, request):
        account = Account.objects.get(id=request.user.id)
        data = self.OutputSerializer(instance=account).data
        return Response(data=data)


class CookieTokenObtainPairView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)

        if response.data.get("access"):
            response.set_cookie(
                "access_token",
                response.data["access"],
                httponly=True,
                samesite="None",
                secure=True
            )

        if response.data.get("refresh"):
            response.set_cookie(
                "refresh_token",
                response.data["refresh"],
                httponly=True,
                samesite="None",
                secure=True
            )

        return response


class CookieTokenRefreshView(TokenRefreshView):
    class CookieTokenRefreshSerializer(TokenRefreshSerializer):
        refresh = None
        def validate(self, attrs):

            attrs["refresh"] = self.context["request"].COOKIES.get("refresh_token")
            if attrs["refresh"]:
                return super().validate(attrs)
            else:
                raise InvalidToken("No valid token found in cookie 'refresh_token'")


    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)

        if response.data.get("access"):
            response.set_cookie(
                "access_token",
                response.data["access"],
                httponly=True,
                samesite="None",
                secure=True,
            )
            del response.data['access']

        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
