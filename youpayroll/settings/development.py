from decouple import config
from .base import *

DEBUG = config('DEBUG', cast=bool, default=True)
SECURE_PROXY_SSL_HEADER = None if DEBUG else ('HTTP_X_FORWARDED_PROTO', 'https')
