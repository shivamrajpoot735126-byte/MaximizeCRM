from django.db import models
class SavedReport(models.Model):
    name = models.CharField(max_length=160)
    report_type = models.CharField(max_length=100)
    filters = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name
