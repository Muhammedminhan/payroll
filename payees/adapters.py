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

        # Check if the domain matches YGG_EMAIL_DOMAIN case-insensitively
        allowed_domain = YGG_EMAIL_DOMAIN.strip().lower()
        user_email = email.strip().lower()
        email_domain = user_email.rsplit("@", 1)[-1] if "@" in user_email else ""
        if email_domain != allowed_domain:
            logger.warning("Unauthorized social login attempt for domain '%s'", email_domain or "unknown")
            raise PermissionDenied(f"Only @{YGG_EMAIL_DOMAIN} emails are allowed.")
