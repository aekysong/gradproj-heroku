from django.conf import settings
from django.db import models


class University(models.Model):
    name = models.CharField(max_length=100)
    nation = models.CharField(max_length=20)
    remarks = models.TextField(null=True)
    website = models.CharField(max_length=200)
    available_number = models.CharField(max_length=100)
    language_condition = models.TextField()
    one_year_available = models.TextField(null=True)
    course_restriction = models.TextField(null=True)
    not_major_course = models.TextField(null=True)
    keyword = models.CharField(max_length=200)  # nlp result
    satisfaction = models.FloatField(null=True)
    went_number = models.IntegerField(null=True)
    went_major = models.CharField(max_length=200, null=True)
    image_url = models.CharField(max_length=150, null=True)

    def __str__(self):
        return self.name


class Report(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=30)
    department = models.CharField(max_length=30)
    major = models.CharField(max_length=40)
    ex_period = models.CharField(max_length=40)
    visa_type = models.CharField(max_length=50)
    visa_period = models.CharField(max_length=50)
    visa_process = models.TextField()
    dorm_name = models.CharField(max_length=100)
    dorm_location = models.CharField(max_length=100)
    dorm_cost = models.CharField(max_length=100)
    dorm_satisfaction = models.CharField(max_length=100)
    dorm_comment = models.TextField()
    lecture_comment = models.TextField()
    lecture_grading = models.TextField()
    culture_activity = models.TextField()
    final_satisfaction = models.IntegerField()
    final_comment = models.TextField()

    def __str__(self):
        return self.student_id


class FavoriteUniversity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    university = models.ForeignKey(University, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('user', 'university'),)

    def __str__(self):
        return self.university.name
