import os
from django.core.wsgi import get_wsgi_application

# Safer default for WSGI entrypoint to prevent accidental dev-mode in prod
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'youpayroll.settings.production')
application = get_wsgi_application()
