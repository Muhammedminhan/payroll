import logging
from django.views import View
from django.http import HttpResponse
from django.db import connection

logger = logging.getLogger(__name__)

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
        except Exception:
            logger.exception("Readiness check failed")
            return HttpResponse("Service Unavailable", status=503)

class LegacyHealthCheck(LivenessCheck):
    """
    Temporary compatibility endpoint for /health/ which is used by ALB
    and K8s liveness probes. 
    
    DEPRECATION NOTE: The shared central Helm charts currently bind both liveness 
    and readiness probes to a single path (.Values.deployment.containers.default.health.path).
    Consequently, /health/ must remain a liveness check (returning 200 without DB checks) 
    to prevent transient database network blips from killing/restarting active pods.
    
    Once the Helm templates support split endpoints for liveness (path: /liveness/) 
    and readiness (path: /readiness/), this legacy endpoint should be deprecated and removed.
    """
    pass
