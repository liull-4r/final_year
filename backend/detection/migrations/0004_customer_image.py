# Generated by Django 5.0.4 on 2024-04-24 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('detection', '0003_customer_bio'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]