# from rest_framework import viewsets
from ..models import Post, Notice, Comment
from .serializers import PostSerializer, NoticeSerializer, CommentSerializer, MyPostSerializer
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from rest_framework import permissions, status
from datetime import datetime
from user.models import Student
from django.utils import timezone
from rest_framework.response import Response


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.AllowAny, )


class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.AllowAny, )


class PostCreateView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        request.data['author'] = Student.objects.get(user=request.user)
        request.data['created_date'] = datetime.strptime(request.data['created_date'], '%Y-%m-%d')
        request.data['created_date'] = timezone.make_aware(request.data['created_date'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PostUpdateView(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, )


class PostDeleteView(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, )


class CommentListView(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post = Post.objects.get(id=self.kwargs['pk'])
        return Comment.objects.filter(post=post)


class CommentCreateView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        request.data['author'] = Student.objects.get(user=request.user)
        request.data['post'] = Post.objects.get(id=request.data['post'])
        request.data['created_date'] = datetime.strptime(request.data['created_date'], '%Y-%m-%d')
        request.data['created_date'] = timezone.make_aware(request.data['created_date'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentUpdateView(UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated, )


class CommentDeleteView(DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated, )


class NoticeListView(ListAPIView):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer


class MyPostListView(ListAPIView):
    serializer_class = MyPostSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = Student.objects.get(user=self.request.user)
        return Post.objects.filter(author=user)
