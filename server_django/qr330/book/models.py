from django.db import models
from member.models import Member

class Book(models.Model):
    book_id = models.AutoField(primary_key = True)
    room_id = models.CharField(max_length = 20)
    start = models.IntegerField()
    end = models.IntegerField()
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)
    checkin_QR = models.CharField(max_length = 100, null=True)
    gen_time_checkin_qr = models.DateTimeField(null=True)
    checkout_QR = models.CharField(max_length = 100, null=True)
    gen_time_checkout_qr = models.DateTimeField(null=True)
    isCheckIn = models.BooleanField(default=False)
    isCheckOut = models.BooleanField(default=False)

    def getDic(self):
        return {
            'book_id' : self.book_id,
            'start' : self.start,
            'end' : self.end
        }

class Wait(models.Model):
    wait_id = models.AutoField(primary_key = True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    start = models.IntegerField()
    end = models.IntegerField()
    date = models.DateField(auto_now=True)

    def getDic(self):
        return {
            'wait_id' : self.wait_id,
            'start' : self.start,
            'end' : self.end
        }
