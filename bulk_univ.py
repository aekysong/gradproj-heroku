import os
import django
import csv

from universities.models import University

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gradproj.settings")
django.setup()


univ_instances = []

with open('../../univ_data.csv', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for data in reader:
        if data['name'] != '':
            name = data['name']
            nation = data['nation']
            remarks = data['remarks']
            website = data['website']
            available_number = data['available_number']
            language_condition = data['language_condition']
            one_year_available = data['one_year_available']
            course_restriction = data['course_restriction']
            not_major_course = data['not_major_course']
            keyword = data['keyword']
            satisfaction = data['satisfaction']
            went_number = data['went_number']
            went_major = data['went_major']
            image_url = data['image_url']

            univ_instances.append(University(name=name, nation=nation, remarks=remarks,
                                             website=website,
                                             available_number=available_number,
                                             language_condition=language_condition,
                                             one_year_available=one_year_available,
                                             course_restriction=course_restriction,
                                             not_major_course=not_major_course,
                                             keyword=keyword,
                                             satisfaction=satisfaction,
                                             went_number=went_number, went_major=went_major,
                                             image_url=image_url))

University.objects.bulk_create(univ_instances)
