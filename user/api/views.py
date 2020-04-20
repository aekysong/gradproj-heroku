# from rest_framework.permissions import IsAuthenticated
from .serializers import CreateStudentSerializer, StudentSerializer, UserSerializer
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import permissions, status
from ..models import Student, User


class CreateUserView(CreateAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = CreateStudentSerializer

    def post(self, request, *args, **kwargs):
        # print("=======request.data=======", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = serializer.save()
        token, created = Token.objects.get_or_create(user=student.user)
        return Response({
            "user": StudentSerializer(
                student, context=self.get_serializer_context()
            ).data,
            "token": token.key
        })


class GetUserView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = StudentSerializer

    def get_object(self):
        return Student.objects.get(user=self.request.user)

    def get(self, request, *args, **kwargs):
        userid = self.request.user.id

        return Response({
            "user": userid,
            "student": StudentSerializer(
                self.get_object(), context=self.get_serializer_context()
            ).data
        })


class UserValidationView(ListAPIView):
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        if User.objects.filter(username=request.query_params['username']).exists():
            return Response(status=status.HTTP_409_CONFLICT)
        else:
            return Response(status=status.HTTP_202_ACCEPTED)
