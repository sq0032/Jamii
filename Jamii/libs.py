import time
import datetime

def thumbnail_path(instance, filename):
    try:
        extName = filename.rsplit('.',1)[1]
    except:
        extName = ""
    name = instance.id
    return 'thumbnail/%s-s.%s'%(name,extName)

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

def datetime_to_milliseconds(some_datetime_object):
    timetuple = some_datetime_object.timetuple()
    timestamp = time.mktime(timetuple)
    return timestamp * 1000.0
