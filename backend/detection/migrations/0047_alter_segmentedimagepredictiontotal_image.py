# Generated by Django 5.0.4 on 2024-06-06 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('detection', '0046_segmentedimagepredictiontotal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='segmentedimagepredictiontotal',
            name='image',
            field=models.ImageField(upload_to='mriscan/'),
        ),
    ]
