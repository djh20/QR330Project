from django.db import models

class Member(models.Model):
    id = models.CharField(max_length = 20, primary_key = True)
    pw = models.CharField(max_length = 512)
    name = models.CharField(max_length = 11)
    subscribe = models.TextField(max_length=500, null=True)

    def getSubscribe(self):
        return self.subscribe