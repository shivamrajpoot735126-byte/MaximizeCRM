from django.db import models
class Workflow(models.Model):
    name = models.CharField(max_length=160)
    trigger = models.CharField(max_length=120)
    action = models.CharField(max_length=120)
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name
