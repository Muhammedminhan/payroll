from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from auditlog.registry import auditlog
from payees.constants import TDS_LEGAL_NAME_CHOICES
from .constants import OPERATION_CHOICES


# Create your models here.
class TDS(models.Model):
    """ Model containing Tax Deducted at Source information """

    tds_legal_name = models.CharField(max_length=50,
                                      choices=TDS_LEGAL_NAME_CHOICES,
                                      unique=True)
    tds_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    class Meta:
        verbose_name = _("Tax Deducted at Source")
        verbose_name_plural = _("Tax Deducted at Source")

    def __str__(self):
        return self.tds_legal_name


auditlog.register(TDS)


class Component(models.Model):
    """
    Model contains Components name and its corresponding operations
    """
    component_name = models.CharField(max_length=100, unique=True)
    operation = models.CharField(max_length=10, choices=OPERATION_CHOICES)  # 'sum' or 'subtract'

    def __str__(self):
        return self.component_name


auditlog.register(Component)
