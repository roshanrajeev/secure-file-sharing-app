# Generated by Django 5.1.4 on 2024-12-12 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='name',
            field=models.CharField(default='abc', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(upload_to='uploads/'),
        ),
    ]
