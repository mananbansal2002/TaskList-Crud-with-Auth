# tasks/admin.py
from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'due_date', 'description')
    search_fields = ('title', 'description')  
    list_filter = ('due_date',)
    ordering = ('due_date',)  

admin.site.register(Task, TaskAdmin)
