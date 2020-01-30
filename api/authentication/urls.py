from django.urls import path, include

from .views import UserLoginView, UserSignupView, UserListView


urlpatterns = [
    path('login/', UserLoginView.as_view(), name="auth-login"),
    path('signup/', UserSignupView.as_view(), name="auth-signup"),
    path('users/<int:pk>/', UserListView.as_view(), name="auth-users")
]