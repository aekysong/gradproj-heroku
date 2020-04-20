from django.urls import path
from .views import (
    UniversityListView,
    UniversityDetailView,
    ReportListView,
    FavoriteUniversityListView,
    FavoriteUniversityCreateView,
    FavoriteUniversityDeleteView,
    UniversityListCreateView
)

urlpatterns = [
    path('universities/', UniversityListView.as_view()),
    path('universities/search/', UniversityListCreateView.as_view()),
    path('universities/<pk>/', UniversityDetailView.as_view()),
    path('universities/<pk>/reports/', ReportListView.as_view()),
    path('favorites/', FavoriteUniversityListView.as_view()),
    path('favorites/create/', FavoriteUniversityCreateView.as_view()),
    path('favorites/delete/', FavoriteUniversityDeleteView.as_view()),
]
