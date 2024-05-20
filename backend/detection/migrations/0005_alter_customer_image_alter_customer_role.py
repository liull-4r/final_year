# Generated by Django 5.0.4 on 2024-04-25 11:01

import detection.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('detection', '0004_customer_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/', validators=[detection.validators.validate_file_size]),
        ),
        migrations.AlterField(
            model_name='customer',
            name='role',
            field=models.CharField(choices=[('Doctor', 'Doctor'), ('Patient', 'Patient')], default='Patient', max_length=10),
        ),
    ]