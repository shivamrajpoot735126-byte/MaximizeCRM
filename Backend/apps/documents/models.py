from django.db import models
class Document(models.Model):
    title = models.CharField(max_length=180)
    file = models.FileField(upload_to="documents/", blank=True, null=True)
    category = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.title
