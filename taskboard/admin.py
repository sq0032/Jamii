from django.contrib import admin
from taskboard.models import *

# Register your models here.
admin.site.register(TaskBoard)
admin.site.register(TaskList)
admin.site.register(TaskCard)