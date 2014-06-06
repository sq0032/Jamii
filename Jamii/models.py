from django.db import models
#from django.contrib.auth.models import User

class JamiiIntroduction(models.Model):
    intro = models.TextField(max_length = 400)
    video = models.TextField(max_length = 200)
    
    def __unicode__(self):
        return self.intro[0:100]