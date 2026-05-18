from django.core.exceptions import ImproperlyConfigured
from decouple import config
from .base import *

# Enforce Sandbox mode
DEBUG = False

# Explicitly validate critical environment variables
GOOGLE_CLIENT_ID = config('GOOGLE_CLIENT_ID', default=None)
if not GOOGLE_CLIENT_ID:
    raise ImproperlyConfigured('GOOGLE_CLIENT_ID must be set in sandbox.')

# Required in sandbox
FIELD_ENCRYPTION_KEY = config('FIELD_ENCRYPTION_KEY')
SECRET_KEY = config('SECRET_KEY')

# Add any sandbox-specific overrides here
