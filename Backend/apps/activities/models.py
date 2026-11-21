from django.db import models
class Task(models.Model):
    STATUS = [("pending","Pending"),("in_progress","In progress"),("completed","Completed")]
    title = models.CharField(max_length=180)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default="pending")
    priority = models.CharField(max_length=20, default="medium")
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.title
class Event(models.Model):
    title = models.CharField(max_length=180)
    description = models.TextField(blank=True)
    starts_at = models.DateTimeField()
    location = models.CharField(max_length=180, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.title
