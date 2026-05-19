import os
from celery import Celery

from django.core.exceptions import ImproperlyConfigured

if not os.environ.get('DJANGO_SETTINGS_MODULE'):
    raise ImproperlyConfigured("DJANGO_SETTINGS_MODULE must be set before starting Celery.")

app = Celery('youpayroll')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
