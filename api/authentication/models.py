from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import AuthUserManager

class User(AbstractBaseUser, PermissionsMixin):
    """User model for custom user
    
    """
    username = None
    phonenumber = models.CharField(max_length=120, unique=True)
    email = models.EmailField(max_length=120, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = AuthUserManager()