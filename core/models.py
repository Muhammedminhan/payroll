from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from auditlog.registry import auditlog
from django.utils import timezone
import datetime

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    consultant_id = models.CharField(max_length=20, blank=True)
    designation = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')], blank=True)
    dob = models.DateField(null=True, blank=True)
    
    # Contract Details
    contract_start = models.DateField(null=True, blank=True)
    contract_end = models.DateField(null=True, blank=True)
    consultant_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    # Reporting
    reporting_to_name = models.CharField(max_length=100, blank=True)
    reporting_to_role = models.CharField(max_length=100, blank=True)
    
    # Bank Details
    account_number = models.CharField(max_length=50, blank=True)
    ifsc_code = models.CharField(max_length=20, blank=True)
    micr_code = models.CharField(max_length=20, blank=True)
    branch_address = models.TextField(blank=True)
    
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

# Signals to auto-create Profile
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()

class Payslip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payslips')
    month = models.CharField(max_length=20) # e.g., "October"
    year = models.IntegerField()
    gross_pay = models.DecimalField(max_digits=10, decimal_places=2)
    reimbursement = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    take_home = models.DecimalField(max_digits=10, decimal_places=2)
    file = models.FileField(upload_to='payslips/', null=True, blank=True)
    tax_worksheet = models.FileField(upload_to='tax_worksheets/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payslip - {self.user.username} - {self.month} {self.year}"

class Document(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('UPLOADED', 'Uploaded'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    file = models.FileField(upload_to='documents/', null=True, blank=True)
    admin_feedback = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.user.username}"

class AdminNotification(models.Model):
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class WikiCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Wiki Categories"

    def __str__(self):
        return self.name

class WikiPage(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField() # Markdown content
    category = models.ForeignKey(WikiCategory, on_delete=models.SET_NULL, null=True, related_name='pages')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class UserNotification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=50, default='INFO') # e.g., 'ACTION_REQUIRED', 'INFO'
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.title}"

@receiver(post_save, sender=Profile)
def notify_profile_update(sender, instance, created, **kwargs):
    # Trigger on both creation and update to ensure user sees the requirement
    # Prevent spamming: only notify if no ACTION_REQUIRED notif exists OR the last one was over 5 mins ago
    recent_threshold = timezone.now() - datetime.timedelta(minutes=5)
    existing = UserNotification.objects.filter(
        user=instance.user,
        notification_type='ACTION_REQUIRED',
        is_read=False
    ).exists()
    
    # Also check if we just created one recently to avoid echo
    recent = UserNotification.objects.filter(
        user=instance.user,
        notification_type='ACTION_REQUIRED',
        created_at__gt=recent_threshold
    ).exists()
    
    if not existing and not recent:
        UserNotification.objects.create(
            user=instance.user,
            notification_type='ACTION_REQUIRED',
            is_read=False,
            title="Let's get this done!",
            message="Kindly share the confirmation screenshot for the payment after updating your profile."
        )
auditlog.register(Profile)
auditlog.register(Payslip)
auditlog.register(Document)
auditlog.register(WikiPage)
