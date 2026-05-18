from django.test import TestCase
from .models import PayRun, PayRunStatusChoices
from .forms import PayRunForm

class PayRunFormTest(TestCase):
    def test_suggested_next_period(self):
        # Create an approved payrun for Dec 2025
        PayRun.objects.create(month=12, year=2025, status=PayRunStatusChoices.APPROVED)
        
        form = PayRunForm()
        self.assertEqual(form.fields['month'].initial, 1)
        self.assertEqual(form.fields['year'].initial, 2026)
        self.assertTrue(form.fields['month'].disabled)

    def test_rejected_payrun_suggests_same_period(self):
        # Create a rejected payrun for Jan 2026
        PayRun.objects.create(month=1, year=2026, status=PayRunStatusChoices.REJECTED)
        
        form = PayRunForm()
        self.assertEqual(form.fields['month'].initial, 1)
        self.assertEqual(form.fields['year'].initial, 2026)
        self.assertTrue(form.fields['month'].disabled)
