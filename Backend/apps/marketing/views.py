from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Campaign
from .serializers import CampaignSerializer

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all().order_by('-pk')
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]

