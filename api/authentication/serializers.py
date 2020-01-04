from rest_framework import serializers
from .models import User
from ..utils.validatators import validate_password, validate_phone_number
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'secondname',
                  'national_id', 'phonenumber', 'email']


class UserLoginSerializer(serializers.Serializer):
    """Generates token
    """

    token = serializers.CharField(max_length=250, read_only=True)
    email = serializers.EmailField(max_length=50)
    password = serializers.CharField(write_only=True)


class UserSignupSerializer(serializers.ModelSerializer):
    """Signsup user
    """

    class Meta:
        model = User

        fields = ['email', 'phonenumber', 'password']
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


    