from rest_framework import serializers
from .models import Payee, BankDetails, BankDetailsAck

class BankDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankDetails
        fields = '__all__'
        read_only_fields = ['payee']

class PayeeSerializer(serializers.ModelSerializer):
    bank_details = BankDetailSerializer(many=True, read_only=True)
    class Meta:
        model = Payee
        fields = '__all__'

class BankDetailAcknowledgementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankDetailsAck
        fields = '__all__'
        read_only_fields = ['payee']
