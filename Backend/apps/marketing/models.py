from django.db import models
class Campaign(models.Model):
    STATUS = [("draft","Draft"),("active","Active"),("paused","Paused"),("completed","Completed")]
    name = models.CharField(max_length=160)
    channel = models.CharField(max_length=80, blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default="draft")
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    budget = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name
