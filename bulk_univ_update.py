import os
import django
import csv

from universities.models import University

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gradproj.settings")
django.setup()

with open('univ_data.csv', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for data in reader:
        if data['name'] != '':
            print(data['name'])
            name = data['name']
            keyword = data['keyword']

            univ = University.objects.get(name=name)
            univ.keyword = keyword
            univ.save()
