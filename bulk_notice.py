import os
import django
import csv

from community.models import Notice

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gradproj.settings")
django.setup()


notice_instances = []

with open('../../office_notice_data.csv', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for data in reader:
        if data['no'] != '':
            no = data['no']
            title = data['title']
            date = data['date']
            url = data['url']

            notice_instances.append(Notice(no=no, title=title, date=date, url=url))

Notice.objects.bulk_create(notice_instances)
