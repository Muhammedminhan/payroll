from rest_framework import viewsets, permissions
from .models import Component, TaxDeductedAtSource
from .serializers import ComponentSerializer, TaxDeductedAtSourceSerializer

class ComponentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ComponentSerializer
    queryset = Component.objects.all()

class TaxDeductedAtSourceViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaxDeductedAtSourceSerializer
    queryset = TaxDeductedAtSource.objects.all()
