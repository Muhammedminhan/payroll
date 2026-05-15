import logging
from django.views import View
from django.http import HttpResponse
from django.db import connection

logger = logging.getLogger(__name__)

# Create your views here.
class LivenessCheck(View):
    """Simple process check (no DB dependency)"""
    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        return HttpResponse("OK", status=200)

class ReadinessCheck(View):
    """Dependency check (DB)"""
    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            return HttpResponse("OK", status=200)
        except Exception as e:
            # Redact DSN info by logging only the message
            logger.error(f"Readiness check failed: {str(e)}")
            return HttpResponse("Service Unavailable", status=503)
