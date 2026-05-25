from rest_framework import viewsets, permissions, mixins
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError, transaction
from .models import Payee, BankDetails, BankDetailsAck
from .serializers import PayeeSerializer, BankDetailSerializer, BankDetailAcknowledgementSerializer

class PayeeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PayeeSerializer
    queryset = Payee.objects.all().order_by('hrm_id')
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Payee.objects.all().order_by('hrm_id')
        return Payee.objects.filter(user=self.request.user).order_by('hrm_id')

class BankDetailViewSet(mixins.CreateModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    """
    Bank details have a single editable current record per payee.

    POST creates the record when none exists; later POSTs update the current
    record instead of creating duplicates. PATCH/PUT correct that same record.
    Deletes are intentionally not exposed so acknowledgement history remains
    tied to the bank-details row that was reviewed.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BankDetailSerializer
    queryset = BankDetails.objects.all()
    
    def get_queryset(self):
        return BankDetails.objects.filter(payee__user=self.request.user)

    def perform_create(self, serializer):
        try:
            payee = Payee.objects.get(user=self.request.user)
        except Payee.DoesNotExist:
            raise ValidationError({"detail": "User is not registered as a payee."})
        serializer.save(payee=payee)

    def create(self, request, *args, **kwargs):
        try:
            payee = Payee.objects.get(user=request.user)
        except Payee.DoesNotExist:
            raise ValidationError({"detail": "User is not registered as a payee."})

        try:
            with transaction.atomic():
                Payee.objects.select_for_update().get(pk=payee.pk)
                bank_details = (
                    BankDetails.objects
                    .select_for_update()
                    .filter(payee=payee)
                    .order_by('-id')
                    .first()
                )
                if bank_details:
                    serializer = self.get_serializer(
                        bank_details,
                        data=request.data,
                        partial=True,
                    )
                    serializer.is_valid(raise_exception=True)
                    serializer.save(payee=payee)
                    return Response(serializer.data, status=status.HTTP_200_OK)

                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save(payee=payee)
                headers = self.get_success_headers(serializer.data)
                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED,
                    headers=headers,
                )
        except IntegrityError:
            bank_details = BankDetails.objects.filter(payee=payee).order_by('-id').first()
            if not bank_details:
                raise
            serializer = self.get_serializer(
                bank_details,
                data=request.data,
                partial=True,
            )
            serializer.is_valid(raise_exception=True)
            serializer.save(payee=payee)
            return Response(serializer.data, status=status.HTTP_200_OK)

class BankDetailAcknowledgementViewSet(mixins.CreateModelMixin,
                                       mixins.ListModelMixin,
                                       mixins.RetrieveModelMixin,
                                       viewsets.GenericViewSet):
    """
    Acknowledgements are immutable user-attestations.
    Exposing only Create, List, and Retrieve.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BankDetailAcknowledgementSerializer
    queryset = BankDetailsAck.objects.all()
    
    def get_queryset(self):
        return BankDetailsAck.objects.filter(payee__user=self.request.user)

    def perform_create(self, serializer):
        try:
            payee = Payee.objects.get(user=self.request.user)
        except Payee.DoesNotExist:
            raise ValidationError({"detail": "User is not registered as a payee."})
        
        bank_details = serializer.validated_data.get('bank_details')
        if not bank_details:
            raise ValidationError({"bank_details": "This field is required."})
        elif bank_details.payee != payee:
            raise ValidationError({"detail": "The specified bank details do not belong to this payee."})

        try:
            serializer.save(payee=payee, bank_details=bank_details)
        except IntegrityError:
            raise ValidationError({"bank_details": "Bank details have already been acknowledged."})
