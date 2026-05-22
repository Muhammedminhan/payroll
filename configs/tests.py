from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from decimal import Decimal

from .models import TDS, Component
from .serializers import ComponentSerializer, TaxDeductedAtSourceSerializer

class TDSModelTests(TestCase):
    def test_tds_percentage_validation(self):
        # Valid percentage
        tds_valid = TDS(tds_legal_name="technical-consultants", tds_percentage=Decimal('10.50'))
        try:
            tds_valid.full_clean()
        except ValidationError:
            self.fail("full_clean() raised ValidationError unexpectedly for valid TDS percentage!")

        # Invalid percentage: less than 0
        tds_invalid_low = TDS(tds_legal_name="professional-consultant", tds_percentage=Decimal('-1.00'))
        with self.assertRaises(ValidationError):
            tds_invalid_low.full_clean()

        # Invalid percentage: greater than 100
        tds_invalid_high = TDS(tds_legal_name="employment", tds_percentage=Decimal('105.00'))
        with self.assertRaises(ValidationError):
            tds_invalid_high.full_clean()


class ComponentModelTests(TestCase):
    def test_component_name_unique(self):
        Component.objects.create(component_name="Basic Salary", operation="sum")
        
        # Creating a duplicate component name should raise IntegrityError
        with self.assertRaises(IntegrityError):
            Component.objects.create(component_name="Basic Salary", operation="subtract")


class SerializerTests(TestCase):
    def test_tds_serializer(self):
        tds = TDS.objects.create(tds_legal_name="technical-consultants", tds_percentage=Decimal('15.00'))
        serializer = TaxDeductedAtSourceSerializer(tds)
        expected_data = {
            'id': tds.id,
            'tds_legal_name': 'technical-consultants',
            'tds_percentage': '15.00'
        }
        self.assertEqual(serializer.data, expected_data)

    def test_component_serializer(self):
        component = Component.objects.create(component_name="Bonus", operation="sum")
        serializer = ComponentSerializer(component)
        expected_data = {
            'id': component.id,
            'component_name': 'Bonus',
            'operation': 'sum'
        }
        self.assertEqual(serializer.data, expected_data)


class ConfigsViewPermissionsTests(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(username='admin', password='password')
        self.staff_user = User.objects.create_user(username='staff', password='password', is_staff=True)
        self.normal_user = User.objects.create_user(username='normal', password='password')
        
        self.component = Component.objects.create(component_name="Allowance", operation="sum")
        self.tds = TDS.objects.create(tds_legal_name="apprentices", tds_percentage=Decimal('5.00'))

        self.component_list_url = reverse('component-list')
        self.tds_list_url = reverse('tds-list')
        
        self.component_data = {"component_name": "New Component", "operation": "sum"}

    def test_unauthenticated_user_cannot_read(self):
        response = self.client.get(self.component_list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_normal_user_cannot_read(self):
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.get(self.component_list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_normal_user_cannot_create(self):
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.post(self.component_list_url, self.component_data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_user_can_create(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(self.component_list_url, self.component_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_staff_user_can_create(self):
        self.client.force_authenticate(user=self.staff_user)
        response = self.client.post(self.component_list_url, {"component_name": "Another Component", "operation": "sum"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
