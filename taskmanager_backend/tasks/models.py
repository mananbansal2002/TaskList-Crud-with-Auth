from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    effort_to_complete = models.IntegerField()  # Effort in days
    due_date = models.DateField()
    created_by = models.CharField(max_length=200)

    def __str__(self):
        return self.title
