# Generated by Django 3.0.4 on 2020-03-16 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('universities', '0012_auto_20200316_0959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='dorm_satisfaction',
            field=models.CharField(max_length=50),
        ),
    ]
