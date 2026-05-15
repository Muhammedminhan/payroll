import os
from celery import Celery

# Set development as default for local runs
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'youpayroll.settings.development')

app = Celery('youpayroll')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
