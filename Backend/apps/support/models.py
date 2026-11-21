from django.db import models
class Ticket(models.Model):
    PRIORITY = [("low","Low"),("medium","Medium"),("high","High"),("urgent","Urgent")]
    STATUS = [("open","Open"),("in_progress","In progress"),("resolved","Resolved"),("closed","Closed")]
    subject = models.CharField(max_length=200)
    customer_name = models.CharField(max_length=160)
    customer_email = models.EmailField(blank=True)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY, default="medium")
    status = models.CharField(max_length=20, choices=STATUS, default="open")
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.subject
