from rest_framework import serializers
from .models import Component, TaxDeductedAtSource

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'

class TaxDeductedAtSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxDeductedAtSource
        fields = '__all__'
