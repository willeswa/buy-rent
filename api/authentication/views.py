from rest_framework import generics, viewsets
from django.contrib.auth import login
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework import status
from .models import User
from .serializers import UserSignupSerializer, UserLoginSerializer
from rest_framework.permissions import AllowAny
from ..utils.generate_tokens import get_tokens

from rest_framework.authtoken.models import Token


class UserLoginView(generics.CreateAPIView):
    """User login view
    """

    queryset = User.objects.all()
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)

            if not user.check_password(password):
                raise Exception

            login(request, user)

            token = get_tokens(user)
            return Response({'user': {'is_admin': user.is_superuser, 'email': user.email, 'token': token}})
            
        except Exception:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data={"error": "Invalid email or password"})


class UserSignupView(generics.CreateAPIView):
    """User register view
    """

    querset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSignupSerializer
