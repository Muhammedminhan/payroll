from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PayRunViewSet, PaymentViewSet, PayRecordRegisterViewSet, Form16ViewSet, Form16EntryViewSet

router = DefaultRouter()
router.register(r'pay-runs', PayRunViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'registers', PayRecordRegisterViewSet)
router.register(r'form16s', Form16ViewSet)
router.register(r'form16-entries', Form16EntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
