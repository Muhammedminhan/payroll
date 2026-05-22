from rest_framework import viewsets, permissions
from .models import Component, TDS
from .serializers import ComponentSerializer, TaxDeductedAtSourceSerializer

class ComponentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ComponentSerializer
    queryset = Component.objects.all()

class TaxDeductedAtSourceViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = TaxDeductedAtSourceSerializer
    queryset = TDS.objects.all()
