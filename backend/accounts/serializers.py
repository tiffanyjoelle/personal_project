from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CustomUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = ["id", "first_name", "last_name", "username", "is_staff", "office_code"]

class RegisterSerializer(serializers.ModelSerializer):
  username = serializers.CharField(
    required=True,
    validators=[UniqueValidator(queryset=CustomUser.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True)

  office_code = serializers.CharField(
    validators=[UniqueValidator(queryset=CustomUser.objects.all())])
  
  class Meta:
    model = CustomUser
    fields = ('username', 'password',
        'first_name', 'last_name', 'office_code')
    extra_kwargs = {
      'first_name': {'required': True},
      'last_name': {'required': True}
    }
  def create(self, validated_data):
    user = CustomUser.objects.create(
      username=validated_data['username'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      office_code=validated_data['office_code']
    )
    user.set_password(validated_data['password'])
    user.save()
    return user
