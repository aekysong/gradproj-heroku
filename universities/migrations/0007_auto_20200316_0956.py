# Generated by Django 3.0.4 on 2020-03-16 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('universities', '0006_auto_20200316_0809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='dorm_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='report',
            name='student_id',
            field=models.CharField(max_length=20),
        ),
    ]
