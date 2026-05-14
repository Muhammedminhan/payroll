import os

# Set a default DEBUG value before importing base so dependent settings
# are correctly computed for QA without overriding runtime configuration.
os.environ.setdefault('DEBUG', 'False')

from .base import *

# QA environment settings rely on base.py for security-related defaults so
# they remain secure by default and can still be overridden via environment
# variables when QA infrastructure requires it.
