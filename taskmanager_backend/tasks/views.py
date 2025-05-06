from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username')
        print(username)
        if username:
            return Task.objects.filter(created_by=username)
        return Task.objects.all()
