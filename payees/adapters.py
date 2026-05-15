import logging
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.core.exceptions import PermissionDenied
from .constants import YGG_EMAIL_DOMAIN

logger = logging.getLogger(__name__)

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        """
        Check if the email domain is allowed.
        """
        email = sociallogin.account.extra_data.get('email')
        if not email:
            logger.error("No email found in social login extra_data.")
            raise PermissionDenied("Email is required for login.")

        # Check if the domain matches YGG_EMAIL_DOMAIN
        if not email.endswith(f"@{YGG_EMAIL_DOMAIN}"):
            logger.warning(f"Unauthorized login attempt with email {email}")
            raise PermissionDenied(f"Only @{YGG_EMAIL_DOMAIN} emails are allowed.")
