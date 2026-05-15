import os
from django.core.wsgi import get_wsgi_application

# Set development as default for local runs, but warn in production
# Most production environments (Helm, Docker) will explicitly override this.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'youpayroll.settings.development')
application = get_wsgi_application()
