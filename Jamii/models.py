from django.db import models
#from django.contrib.auth.models import User

class JamiiIntroduction(models.Model):
    intro = models.TextField(max_length = 400)
    
    def __unicode__(self):
        return self.intro[0:100]