# Generated by Django 5.0.4 on 2024-06-04 07:52

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('detection', '0039_remove_doctorspecialistnotification_doctor_id_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctorpatientmessagenotification',
            name='doctor_id',
        ),
        migrations.AddField(
            model_name='doctorpatientmessagenotification',
            name='doctor',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='doctor_patient_messages', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
