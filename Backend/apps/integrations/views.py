from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Integration
from .serializers import IntegrationSerializer

class IntegrationViewSet(viewsets.ModelViewSet):
    queryset = Integration.objects.all().order_by('-pk')
    serializer_class = IntegrationSerializer
    permission_classes = [IsAuthenticated]

