# Generated by Django 5.0.4 on 2024-06-04 07:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('detection', '0041_remove_specialistdoctornotification_specialist_id_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Availability',
        ),
    ]