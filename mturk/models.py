from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Task(models.Model):
	occasion = models.IntegerField()
	season = models.IntegerField()
	style = models.IntegerField()
	ethnicity = models.IntegerField()
	body_shape = models.IntegerField()
