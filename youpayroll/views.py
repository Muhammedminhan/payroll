from django.views import View
from django.http import HttpResponse

# Create your views here.
class HealthCheck(View):
    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        return HttpResponse(status=200)