from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Task(models.Model):
	assignmentId = models.CharField(max_length = 30)
	# result = models.CharField(max_length = 10000)
	workerId = models.CharField(max_length = 30)
	# image_index = models.IntegerField()