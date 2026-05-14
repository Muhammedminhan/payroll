from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PayeeViewSet, BankDetailViewSet, BankDetailAcknowledgementViewSet

router = DefaultRouter()
router.register(r'payees', PayeeViewSet)
router.register(r'bank-details', BankDetailViewSet)
router.register(r'bank-acknowledgements', BankDetailAcknowledgementViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
