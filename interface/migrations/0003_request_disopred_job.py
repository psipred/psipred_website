# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interface', '0002_request_psipred_job'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='disopred_job',
            field=models.BooleanField(default=False),
        ),
    ]
