from django.core.exceptions import ImproperlyConfigured
from decouple import config
from .base import *

# Enforce QA mode
DEBUG = False
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Explicitly validate critical environment variables
GOOGLE_CLIENT_ID = config('GOOGLE_CLIENT_ID', default=None)
if not GOOGLE_CLIENT_ID:
    raise ImproperlyConfigured('GOOGLE_CLIENT_ID must be set in QA.')

# Required in QA
FIELD_ENCRYPTION_KEY = config('FIELD_ENCRYPTION_KEY', default=None)
if not FIELD_ENCRYPTION_KEY:
    raise ImproperlyConfigured('FIELD_ENCRYPTION_KEY must be set in QA.')

SECRET_KEY = config('SECRET_KEY', default=None)
if not SECRET_KEY:
    raise ImproperlyConfigured('SECRET_KEY must be set in QA.')

# Add any QA-specific overrides here
ENABLE_GRAPHIQL = False
