from django.contrib import admin

# Register your models here.
from book.models import Publisher, Author, Book

admin.site.register(Publisher)
admin.site.register(Author)
admin.site.register(Book)