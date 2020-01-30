from django.contrib.auth.base_user import BaseUserManager


class AuthUserManager(BaseUserManager):
    """Custom user manager to allow email authentication instead of the default
    Django username
    """

    def create_user(self, email, password, **extra_fields):
        """Create and save a user with a given email
        """

        if not email:
            raise ValueError('Provide an email to register!')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user


    def  create_superuser(self, email, password, **extra_fields):
        """Create and save a superuser with a given email
        """

        extra_fields.setdefault('is_superuser', True)

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, password, **extra_fields)