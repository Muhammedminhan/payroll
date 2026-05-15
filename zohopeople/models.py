from encrypted_model_fields.fields import EncryptedCharField
from django.db import models


# Create your models here.

class ZohoPeopleFormToken(models.Model):
    # max_length=1024 is defined for form validation but encrypted fields are stored as Text in DB
    access_token = EncryptedCharField(max_length=1024, null=False, blank=False)
    refresh_token = EncryptedCharField(max_length=1024, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    last_refreshed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created']
