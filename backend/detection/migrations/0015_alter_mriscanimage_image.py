# Generated by Django 5.0.4 on 2024-05-12 19:08

import detection.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('detection', '0014_mriscanimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mriscanimage',
            name='image',
            field=models.ImageField(default=1, upload_to='scans/', validators=[detection.validators.validate_file_size]),
            preserve_default=False,
        ),
    ]