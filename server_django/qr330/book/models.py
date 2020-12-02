from django.db import models
from member.models import Member

class Book(models.Model):
    book_id = models.AutoField(primary_key = True)
    room_id = models.IntegerField()
    register = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='register')
    start = models.DateTimeField()
    end = models.DateTimeField()
    isCheckIn = models.BooleanField(default=False)
    isCheckOut = models.BooleanField(default=True)