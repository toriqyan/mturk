# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-20 21:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('occasion', models.IntegerField(default=0)),
                ('season', models.IntegerField(default=0)),
                ('style', models.IntegerField(default=0)),
                ('ethnicity', models.IntegerField(default=0)),
                ('body_shape', models.IntegerField(default=0)),
            ],
        ),
    ]
