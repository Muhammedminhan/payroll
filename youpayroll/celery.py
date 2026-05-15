import os
from celery import Celery

# Safer default for Celery entrypoint
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'youpayroll.settings.production')

app = Celery('youpayroll')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
