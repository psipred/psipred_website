# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2019-02-27 15:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interface', '0007_auto_20190107_1439'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServerSuspension',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('suspend', models.BooleanField(default=False)),
                ('message', models.CharField(max_length=512, null=True)),
                ('allowed_ip', models.GenericIPAddressField(default='127.0.0.1')),
            ],
        ),
    ]
