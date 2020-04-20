from rest_framework import serializers
from ..models import User, Student
from django.contrib.auth.hashers import make_password


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    def validate(self, data):
        # check username is not duplicated
        if self.Meta.model.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("double username")
        return data


class CreateStudentSerializer(serializers.ModelSerializer):
    user = CreateUserSerializer(required=True)

    class Meta:
        model = Student
        fields = '__all__'

    def validate(self, data):
        if self.Meta.model.objects.filter(student_id=data['student_id']).exists():
            raise serializers.ValidationError("double student id")
        return data

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(
            username=user_data['username'],
            password=make_password(user_data['password'])
        )
        return Student.objects.create(user=user, **validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('nickname', 'major', 'interest_nation')



