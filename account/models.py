from django.db import models

# other models used in this app
from django.contrib.auth.models import User


# Create your models here.
class Role(models.Model):
    role        = models.CharField(max_length=12)
    
    def __unicode__(self):
        return self.role

class JamiiUser(models.Model):
    user        = models.OneToOneField(User)
    birthdate   = models.DateField()
    sex         = models.CharField(max_length=1, choices=(('M','Male'),('F','Female')))
    phone       = models.CharField(max_length=15)
    role        = models.ForeignKey(Role)
    
    def __unicode__(self):
        return "%s - %s" % (self.user.username, self.role)