from django.db import models
from account.models import *

# Create your models here.
class Team(models.Model):
    name                = models.CharField(max_length=30)
    introduction        = models.TextField(max_length=300)
    establish_datetime  = models.DateTimeField(auto_now_add=True)
    logo                = models.ImageField(upload_to='teamlogo')
    members             = models.ManyToManyField(User)
    leader              = models.ForeignKey(User, related_name='leader')
    
    def __unicode__(self):
        return self.name
    
class SharedFile(models.Model):
    name    = models.CharField(max_length=100)
    icon    = models.CharField(max_length=100)
    link    = models.CharField(max_length=100)
    uploader= models.ForeignKey(User, related_name='uploader')
    team    = models.ForeignKey(Team)
    upload_datetime = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return '"%s" by %s at %s'%(self.name, self.uploader.username, self.upload_datetime)