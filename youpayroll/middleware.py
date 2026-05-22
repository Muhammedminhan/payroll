import ipaddress

from django.conf import settings


class XForwardedForMiddleware:
    """
    Trust X-Forwarded-For only when the immediate peer is a configured proxy.

    The selected address is the first untrusted hop walking from right to left,
    which handles client -> ALB -> nginx -> Django chains without trusting a
    spoofed left-most value supplied by the client.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        self._set_client_ip(request)
        return self.get_response(request)

    def _set_client_ip(self, request):
        remote_addr = request.META.get('REMOTE_ADDR')
        forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if not remote_addr or not forwarded_for or not _is_trusted_proxy(remote_addr):
            return

        addresses = [addr.strip() for addr in forwarded_for.split(',') if addr.strip()]
        if not addresses:
            return

        for address in reversed(addresses):
            if not _is_valid_ip(address):
                continue
            if not _is_trusted_proxy(address):
                request.META['ORIGINAL_REMOTE_ADDR'] = remote_addr
                request.META['REMOTE_ADDR'] = address
                return


def _is_valid_ip(value):
    try:
        ipaddress.ip_address(value)
    except ValueError:
        return False
    return True


def _is_trusted_proxy(value):
    try:
        address = ipaddress.ip_address(value)
    except ValueError:
        return False

    for proxy in getattr(settings, 'TRUSTED_PROXY_IPS', []):
        try:
            if address in ipaddress.ip_network(proxy, strict=False):
                return True
        except ValueError:
            continue
    return False
