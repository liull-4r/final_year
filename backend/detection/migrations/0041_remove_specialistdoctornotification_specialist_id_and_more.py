# Generated by Django 5.0.4 on 2024-06-04 07:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('detection', '0040_remove_doctorpatientmessagenotification_doctor_id_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='specialistdoctornotification',
            name='specialist_id',
        ),
        migrations.AddField(
            model_name='specialistdoctornotification',
            name='specialist',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='specialist_doctor_notifications', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
