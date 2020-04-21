from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('universities.api.urls')),
    path('api/', include('community.api.urls')),
    path('api/', include('user.api.urls')),
    path('', index, name='index'),
    path('search/', index, name='index'),
    path('universities/', index, name='index'),
    path('universities/<pk>/', index, name='index'),
    path('notices/', index, name='index'),
    path('posts/', index, name='index'),
    path('create/', index, name='index'),
    path('posts/<pk>/', index, name='index'),
    path('posts/<pk>/update/', index, name='index'),
    path('signup/', index, name='index'),
    path('login/', index, name='index'),
    path('favorites/', index, name='index'),
    path('myposts/', index, name='index'),
]
