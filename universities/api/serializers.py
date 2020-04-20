from rest_framework import serializers
from ..models import University, Report, FavoriteUniversity


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'


class FavoriteUniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteUniversity
        fields = ('university',)
        depth = 1

    def create(self, validated_data):
        return FavoriteUniversity.objects.create(user=self.initial_data['user'],
                                                 university=self.initial_data['univ_name'])

