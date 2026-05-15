from django.core.exceptions import ImproperlyConfigured
from decouple import config
from .base import *

# Enforce production mode
DEBUG = False

# Enforce GOOGLE_CLIENT_ID in production when DEBUG is False
if not DEBUG and not GOOGLE_CLIENT_ID:
    raise ImproperlyConfigured('GOOGLE_CLIENT_ID must be set in production when DEBUG is False.')

# Fernet key for django-encrypted-model-fields (REQUIRED in production)
FIELD_ENCRYPTION_KEY = config('FIELD_ENCRYPTION_KEY')

# Add any production-specific overrides here
