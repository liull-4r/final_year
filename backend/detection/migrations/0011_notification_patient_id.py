# Generated by Django 5.0.4 on 2024-04-27 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('detection', '0010_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='patient_id',
            field=models.IntegerField(default=29),
            preserve_default=False,
        ),
    ]
