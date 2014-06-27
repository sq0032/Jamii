from django.db import models

# Create your models here.
from account.models import JamiiUser
from team.models import Team

class MsgBox(models.Model):
    attendants          = models.ManyToManyField(JamiiUser)
    team                = models.ForeignKey(Team, blank=True, null=True)
    subject             = models.CharField(max_length=50)
    create_datetime     = models.DateTimeField(auto_now_add=True)
    update_datetime     = models.DateTimeField(auto_now=True)
    
    def __unicode__(self):
        return self.subject

class Message(models.Model):
    poster              = models.ForeignKey(JamiiUser)
    message             = models.TextField(max_length=300)
    msgbox              = models.ForeignKey(MsgBox)
    create_datetime     = models.DateTimeField(auto_now_add=True)
    #is_seen             = models.BooleanField(default=False)

    def __unicode__(self):
        return "%s: %s"%(self.create_datetime,self.message)
