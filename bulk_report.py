import os
import django
import csv
from universities.models import University, Report


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gradproj.settings')
django.setup()

report_instances = []
with open('../../report_data.csv', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for data in reader:
        if data['pre_university'] != '' and data['major'] != '':
            university = data['university']
            student_id = data['student_id']
            department = data['department']
            major = data['major']
            ex_period = data['ex_period']
            visa_type = data['visa_type']
            visa_period = data['visa_period']
            visa_process = data['visa_process']
            dorm_name = data['dorm_name']
            dorm_location = data['dorm_location']
            dorm_cost = data['dorm_cost']
            dorm_satisfaction = data['dorm_satisfaction']
            dorm_comment = data['dorm_comment']
            lecture_comment = data['lecture_comment']
            lecture_grading = data['lecture_grading']
            culture_activity = data['culture_activity']
            final_satisfaction = data['final_satisfaction']
            final_comment = data['final_comment']

            # print(university)
            univ_obj = University.objects.get(name=university)

            report_instances.append(Report(university=univ_obj, student_id=student_id, department=department,
                                           major=major, ex_period=ex_period, visa_type=visa_type,
                                           visa_period=visa_period, visa_process=visa_process,
                                           dorm_name=dorm_name, dorm_location=dorm_location, dorm_cost=dorm_cost,
                                           dorm_satisfaction=dorm_satisfaction, dorm_comment=dorm_comment,
                                           lecture_comment=lecture_comment, lecture_grading=lecture_grading,
                                           culture_activity=culture_activity, final_satisfaction=final_satisfaction,
                                           final_comment=final_comment))

Report.objects.bulk_create(report_instances) 