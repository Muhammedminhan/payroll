from rest_framework import viewsets, permissions
from .models import Payee, BankDetails, BankDetailsAck
from .serializers import PayeeSerializer, BankDetailSerializer, BankDetailAcknowledgementSerializer

class PayeeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PayeeSerializer
    
    def get_queryset(self):
        return Payee.objects.filter(user=self.request.user)

class BankDetailViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BankDetailSerializer
    
    def get_queryset(self):
        return BankDetails.objects.filter(payee__user=self.request.user)

    def perform_create(self, serializer):
        # Enforce that bank details are always created for the authenticated user's payee record
        payee = Payee.objects.get(user=self.request.user)
        serializer.save(payee=payee)

class BankDetailAcknowledgementViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BankDetailAcknowledgementSerializer
    
    def get_queryset(self):
        return BankDetailsAck.objects.filter(payee__user=self.request.user)

    def perform_create(self, serializer):
        # Enforce that acknowledgements are always created for the authenticated user's payee record
        payee = Payee.objects.get(user=self.request.user)
        serializer.save(payee=payee)
