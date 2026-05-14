import os

# Set a default DEBUG value before importing base so dependent settings
# are correctly computed for sandbox without overriding runtime configuration.
os.environ.setdefault('DEBUG', 'False')

from .base import *

# Add any sandbox-specific overrides here
