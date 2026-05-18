from rest_framework import serializers
from .models import Component, TDS

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'component_name', 'operation']

class TaxDeductedAtSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TDS
        fields = ['id', 'tds_legal_name', 'tds_percentage']
