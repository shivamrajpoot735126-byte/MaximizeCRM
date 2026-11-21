from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SavedReport
from .serializers import SavedReportSerializer

class SavedReportViewSet(viewsets.ModelViewSet):
    queryset = SavedReport.objects.all().order_by('-pk')
    serializer_class = SavedReportSerializer
    permission_classes = [IsAuthenticated]

