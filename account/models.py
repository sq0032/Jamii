from django.db import models

# other models used in this app
from django.contrib.auth.models import User

def isLandscape(width, height):
    """
    Takes the image width and height and returns if the image is in landscape
    or portrait mode.
    """
    if width >= height:
        return True
    else:
        return False

def boxParamsCenter(width, height):
    """
    Calculate the box parameters for cropping the center of an image based
    on the image width and image height
    """
    if isLandscape(width, height):
        upper_x = int((width/2) - (height/2))
        upper_y = 0
        lower_x = int((width/2) + (height/2))
        lower_y = height
        return upper_x, upper_y, lower_x, lower_y
    else:
        upper_x = 0
        upper_y = int((height/2) - (width/2))
        lower_x = width
        lower_y = int((height/2) + (width/2))
        return upper_x, upper_y, lower_x, lower_y

def cropit(img):
    """
    Performs the cropping of the input image to generate a square thumbnail.
    It calculates the box parameters required by the PIL cropping method, crops
    the input image and returns the cropped square.
    """
    print('cropit')
    upper_x, upper_y, lower_x, lower_y = boxParamsCenter(img.size[0], img.size[1])
    box = (upper_x, upper_y, lower_x, lower_y)
    region = img.crop(box)
    return region

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
    thumbnail   = models.ImageField(upload_to='thumbnail', blank=True)

    def __unicode__(self):
        return "%s - %s" % (self.user.username, self.role)
    
    def create_thumbnail(self):
        # original code for this method came from
        # http://snipt.net/danfreak/generate-thumbnails-in-django-with-pil/
        
        # If there is no image associated with this.
        # do not create thumbnail
        if not self.thumbnail:
            return

        self.thumbnail.seek(0)
        print('create thumbnail')
        from PIL import Image
        from cStringIO import StringIO
        from django.core.files.uploadedfile import SimpleUploadedFile
        import os

        # Set our max thumbnail size in a tuple (max width, max height)
        THUMBNAIL_SIZE = (200,200)
        
        DJANGO_TYPE = self.thumbnail.file.content_type
        
        if DJANGO_TYPE == 'image/jpeg':
            PIL_TYPE = 'jpeg'
            FILE_EXTENSION = 'jpg'
        elif DJANGO_TYPE == 'image/png':
            PIL_TYPE = 'png'
            FILE_EXTENSION = 'png'

        # Open original photo which we want to thumbnail using PIL's Image
        image = Image.open(StringIO(self.thumbnail.read()))
        
        # Convert to RGB if necessary
        # Thanks to Limodou on DjangoSnippets.org
        # http://www.djangosnippets.org/snippets/20/
        #
        # I commented this part since it messes up my png files
        #
        #if image.mode not in ('L', 'RGB'):
        #    image = image.convert('RGB')
        
        # We use our PIL Image object to create the thumbnail, which already
        # has a thumbnail() convenience method that contrains proportions.
        # Additionally, we use Image.ANTIALIAS to make the image look better.
        # Without antialiasing the image pattern artifacts may result.
        image = cropit(image)
        image.thumbnail(THUMBNAIL_SIZE, Image.ANTIALIAS)
        
        # Save the thumbnail
        temp_handle = StringIO()
        image.save(temp_handle, PIL_TYPE)
        temp_handle.seek(0)
        
        # Save image to a SimpleUploadedFile which can be saved into
        # ImageField
        suf = SimpleUploadedFile(os.path.split(self.thumbnail.name)[-1],
                temp_handle.read(), content_type=DJANGO_TYPE)
        # Save SimpleUploadedFile into image field
        self.thumbnail.save('%s.%s'%(os.path.splitext(suf.name)[0],FILE_EXTENSION), suf, save=False)
 
    def save(self, *args, **kwargs):
        # create a thumbnail
        self.create_thumbnail()        
        super(JamiiUser, self).save(*args, **kwargs)    