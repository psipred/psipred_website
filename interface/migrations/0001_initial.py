# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('email', models.EmailField(max_length=256, null=True)),
                ('password', models.CharField(blank=True, max_length=25, null=True)),
                ('job_name', models.CharField(max_length=128)),
                ('input_data', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
