from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComponentViewSet, TaxDeductedAtSourceViewSet

router = DefaultRouter()
router.register(r'components', ComponentViewSet)
router.register(r'tds', TaxDeductedAtSourceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
