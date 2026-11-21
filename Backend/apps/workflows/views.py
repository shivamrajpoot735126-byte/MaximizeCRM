from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Workflow
from .serializers import WorkflowSerializer

class WorkflowViewSet(viewsets.ModelViewSet):
    queryset = Workflow.objects.all().order_by('-pk')
    serializer_class = WorkflowSerializer
    permission_classes = [IsAuthenticated]

