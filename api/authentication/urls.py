from django.urls import path, include
from .views import UserLoginView, UserSignupView


urlpatterns = [
    path('login/', UserLoginView.as_view(), name="auth-login"),
    path('signup/', UserSignupView.as_view(), name="auth-signup")
]