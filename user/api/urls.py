from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import CreateUserView, GetUserView, UserValidationView

urlpatterns = [
    path('signup/', CreateUserView.as_view()),
    path("user/", GetUserView.as_view()),
    path("validation/", UserValidationView.as_view())
]