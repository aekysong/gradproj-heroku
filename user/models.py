from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=100, null=True)
    student_id = models.CharField(max_length=20)
    department = models.CharField(max_length=20)
    major = models.CharField(max_length=20)
    interest_nation = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username
