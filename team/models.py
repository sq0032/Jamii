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