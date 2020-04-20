from rest_framework import serializers
from ..models import Post, Notice, Comment


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        return Post.objects.create(author=self.initial_data['author'],
                                   title=self.initial_data['title'],
                                   content=self.initial_data['content'],
                                   tag=self.initial_data['tag'],
                                   created_date=self.initial_data['created_date'])


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        return Comment.objects.create(author=self.initial_data['author'],
                                      post=self.initial_data['post'],
                                      content=self.initial_data['content'],
                                      created_date=self.initial_data['created_date'])


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = '__all__'


class MyPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        depth = 1
