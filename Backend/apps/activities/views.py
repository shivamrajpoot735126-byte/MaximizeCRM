from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Task, Event
from .serializers import TaskSerializer, EventSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-pk')
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-pk')
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

