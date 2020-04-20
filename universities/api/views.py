from django.contrib.auth.models import User
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    ListCreateAPIView,
)
from ..models import University, Report, FavoriteUniversity
from .serializers import UniversitySerializer, ReportSerializer, FavoriteUniversitySerializer
from rest_framework import permissions, status
from rest_framework.response import Response


class UniversityListView(ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer


class UniversityListCreateView(ListCreateAPIView):
    serializer_class = UniversitySerializer

    def get_queryset(self):
        queryset = University.objects.all()
        nation = self.request.query_params.get('nation', None)
        major = self.request.query_params.get('major', None)
        query = self.request.query_params.get('query', None)
        if nation is not None and nation is not '':
            queryset = queryset.filter(nation=nation)
        if major is not None and major is not '':
            queryset = queryset.filter(went_major__contains=major)
        if query is not None and query is not '':
            queryset = queryset.filter(name__contains=query)
        return queryset


class UniversityDetailView(RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer


class ReportListView(ListAPIView):
    serializer_class = ReportSerializer

    def get_queryset(self):
        university = University.objects.get(id=self.kwargs['pk'])
        return Report.objects.filter(university=university)


class FavoriteUniversityListView(ListAPIView):
    serializer_class = FavoriteUniversitySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return FavoriteUniversity.objects.filter(user=user)


class FavoriteUniversityCreateView(CreateAPIView):
    serializer_class = FavoriteUniversitySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        # print(request.data)
        request.data['user'] = request.user
        request.data['univ_name'] = University.objects.get(name=request.data['univ_name'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FavoriteUniversityDeleteView(DestroyAPIView):
    queryset = FavoriteUniversity.objects.all()
    serializer_class = FavoriteUniversitySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        # print(request)
        univ = University.objects.get(name=request.data['univ_name'])
        fav_univ = FavoriteUniversity.objects.get(user=request.user, university=univ)
        self.perform_destroy(fav_univ)
        return Response(status=status.HTTP_204_NO_CONTENT)
