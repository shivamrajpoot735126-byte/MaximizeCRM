from django.db import models
class Lead(models.Model):
    STAGES = [("new","New"),("contacted","Contacted"),("qualified","Qualified"),("proposal","Proposal"),("won","Won"),("lost","Lost")]
    name = models.CharField(max_length=160)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=25, blank=True)
    company = models.CharField(max_length=150, blank=True)
    source = models.CharField(max_length=100, blank=True)
    stage = models.CharField(max_length=20, choices=STAGES, default="new")
    estimated_value = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name
