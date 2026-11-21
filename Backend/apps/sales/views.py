from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Pipeline, Opportunity
from .serializers import PipelineSerializer, OpportunitySerializer

class PipelineViewSet(viewsets.ModelViewSet):
    queryset = Pipeline.objects.all().order_by('-pk')
    serializer_class = PipelineSerializer
    permission_classes = [IsAuthenticated]

class OpportunityViewSet(viewsets.ModelViewSet):
    queryset = Opportunity.objects.all().order_by('-pk')
    serializer_class = OpportunitySerializer
    permission_classes = [IsAuthenticated]

