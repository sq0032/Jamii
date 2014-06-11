from django.db import models
#from account.models import *
from team.models import Team
from django.contrib.auth.models import User

# Create your models here.
class TaskBoard(models.Model):
    team        = models.OneToOneField(Team)
    name        = models.CharField(max_length=20, default="TaskBoard")
    
    def __unicode__(self):
        return '%s\'s %s'%(self.team.name, self.name)
    
class TaskList(models.Model):
    name        = models.CharField(max_length=20, default="TaskList")
    board       = models.ForeignKey(TaskBoard)
    order       = models.IntegerField()
    
    def __unicode__(self):
        return '%s:%s'%(self.board, self.name)
    
class TaskCard(models.Model):
    name        = models.CharField(max_length=20, default="Task")
    description = models.TextField(max_length=200, blank=True)
    order       = models.IntegerField()
    members     = models.ManyToManyField(User, blank=True, null=True)
    list        = models.ForeignKey(TaskList)
    label       = models.CharField(max_length=10, blank=True)
    create_datetime = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return '%s:%s-%s'%(self.list.board.name, self.list.name, self.name)