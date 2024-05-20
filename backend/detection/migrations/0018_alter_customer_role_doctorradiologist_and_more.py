# Generated by Django 5.0.4 on 2024-05-19 19:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('detection', '0017_alter_availability_day'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='role',
            field=models.CharField(choices=[('Doctor', 'Doctor'), ('Patient', 'Patient'), ('Specialist', 'Specialist'), ('Radiologist', 'Radiologist')], max_length=15),
        ),
        migrations.CreateModel(
            name='DoctorRadiologist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason', models.CharField(blank=True, max_length=255)),
                ('notes', models.TextField(blank=True)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='doctor_radiologist_appointments', to=settings.AUTH_USER_MODEL)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patient_radiologist_appointments', to=settings.AUTH_USER_MODEL)),
                ('radiologist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='radiologist_appointments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DoctorRadiologistNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor_id', models.IntegerField()),
                ('message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('read', models.BooleanField(default=False)),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
