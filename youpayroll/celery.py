from celery import Celery


import os
# set the default Django settings module for the 'celery' program.
# No default settings; must be provided via DJANGO_SETTINGS_MODULE env var.

# For creating a new Celery application instance with the project name.
app = Celery('youpayroll')

# To read configuration from Django’s settings using the 'CELERY_' namespace.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()
