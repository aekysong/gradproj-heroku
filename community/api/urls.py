from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    PostListView,
    PostDetailView,
    PostCreateView,
    PostUpdateView,
    PostDeleteView,
    NoticeListView,
    CommentListView,
    CommentCreateView,
    CommentUpdateView,
    CommentDeleteView,
    MyPostListView,
)

urlpatterns = [
    path('posts/', PostListView.as_view()),
    path('posts/create/', PostCreateView.as_view()),
    path('posts/<pk>', PostDetailView.as_view()),
    path('posts/<pk>/update/', PostUpdateView.as_view()),
    path('posts/<pk>/delete/', PostDeleteView.as_view()),
    path('posts/<pk>/comments/', CommentListView.as_view()),
    path('comments/create/', CommentCreateView.as_view()),
    path('comments/<pk>/update/', CommentUpdateView.as_view()),
    path('comments/<pk>/delete/', CommentDeleteView.as_view()),
    path('notices/', NoticeListView.as_view()),
    path('myposts/', MyPostListView.as_view()),
]
