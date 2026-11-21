from django.db import models
class Pipeline(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    def __str__(self): return self.name
class Opportunity(models.Model):
    STAGES = [("prospecting","Prospecting"),("qualification","Qualification"),("proposal","Proposal"),("negotiation","Negotiation"),("won","Won"),("lost","Lost")]
    name = models.CharField(max_length=160)
    company = models.CharField(max_length=150, blank=True)
    value = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    stage = models.CharField(max_length=20, choices=STAGES, default="prospecting")
    expected_close = models.DateField(null=True, blank=True)
    pipeline = models.ForeignKey(Pipeline, null=True, blank=True, on_delete=models.SET_NULL, related_name="opportunities")
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name
