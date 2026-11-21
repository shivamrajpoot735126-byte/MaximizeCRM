from django.db import models
class Integration(models.Model):
    name = models.CharField(max_length=120)
    provider = models.CharField(max_length=120, blank=True)
    status = models.CharField(max_length=40, default="disconnected")
    config_json = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name
