import os
from django.core.exceptions import ImproperlyConfigured

# Set a default DEBUG value before importing base so dependent settings
# are correctly computed for production without overriding runtime configuration.
os.environ.setdefault('DEBUG', 'False')

from .base import *

# Enforce GOOGLE_CLIENT_ID in production when DEBUG is False
if not DEBUG and not GOOGLE_CLIENT_ID:
    raise ImproperlyConfigured('GOOGLE_CLIENT_ID must be set in production when DEBUG is False.')

# Add any production-specific overrides here
