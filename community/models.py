from django.db import models
from django.utils import timezone

from user.models import Student


class Post(models.Model):
    author = models.ForeignKey(Student, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    tag = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(Student, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content


class Notice(models.Model):
    no = models.CharField(max_length=10, null=True)
    title = models.CharField(max_length=100, null=True)
    date = models.CharField(max_length=10, null=True)
    url = models.CharField(max_length=150, null=True)

    def __str__(self):
        return self.title
