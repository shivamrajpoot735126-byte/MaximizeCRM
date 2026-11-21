from django.contrib.auth.models import AbstractUser
from django.db import models
class User(AbstractUser):
    ROLE_CHOICES = [("admin","Admin"),("manager","Manager"),("sales","Sales"),("marketing","Marketing"),("support","Support")]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="sales")
    phone = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=100, blank=True)
