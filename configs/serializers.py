from rest_framework import serializers
from .models import Component, TaxDeductedAtSource

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'component_name', 'operation']

class TaxDeductedAtSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxDeductedAtSource
        fields = ['id', 'tds_legal_name', 'tds_percentage']
