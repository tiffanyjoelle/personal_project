from django.urls import path
from .views import *
from rest_framework.authtoken import views

urlpatterns = [
  path('details',UserDetailAPI.as_view()),
  path('register',RegisterUserAPIView.as_view()),
  path('api-token-auth', views.obtain_auth_token),
]
