from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    office_code = models.CharField(max_length=255, blank=True, null=True)
