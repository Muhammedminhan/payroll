from unittest.mock import patch, MagicMock
from django.utils import timezone
from zohopeople.utils import generate_access_token, get_payees_details
from zohopeople.models import ZohoPeopleFormToken
from django.test import TestCase

class ZohoUtilsTest(TestCase):
    def setUp(self):
        ZohoPeopleFormToken.objects.create(
            access_token="old_access",
            refresh_token="valid_refresh",
            last_refreshed_at=timezone.now() - timezone.timedelta(hours=1)
        )

    @patch('zohopeople.utils.requests.post')
    def test_generate_access_token_success(self, mock_post):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"access_token": "new_access"}
        mock_post.return_value = mock_response

        response = generate_access_token()
        
        self.assertEqual(response.status_code, 200)
        token_obj = ZohoPeopleFormToken.objects.latest('created')
        self.assertEqual(token_obj.access_token, "new_access")
        self.assertIsNotNone(token_obj.last_refreshed_at)

    def test_generate_access_token_multi_row_ordering(self):
        # Create two rows with refresh tokens
        ZohoPeopleFormToken.objects.all().delete()
        
        old_row = ZohoPeopleFormToken.objects.create(
            access_token="old_access",
            refresh_token="old_refresh",
            last_refreshed_at=timezone.now() - timezone.timedelta(hours=2)
        )
        # Force old_row to be 'older'
        ZohoPeopleFormToken.objects.filter(pk=old_row.pk).update(
            created=timezone.now() - timezone.timedelta(hours=5)
        )
        
        new_row = ZohoPeopleFormToken.objects.create(
            access_token="new_access",
            refresh_token="new_refresh",
            last_refreshed_at=timezone.now() - timezone.timedelta(hours=1)
        )

        with patch('zohopeople.utils.requests.post') as mock_post:
            mock_post.return_value.status_code = 200
            mock_post.return_value.json.return_value = {"access_token": "updated_access"}
            
            generate_access_token()
            
            # The newest row (new_row) should have been updated
            new_row.refresh_from_db()
            self.assertEqual(new_row.access_token, "updated_access")
            
            # Negative assertion: old_row should NOT be touched
            old_row.refresh_from_db()
            self.assertEqual(old_row.access_token, "old_access")

    @patch('zohopeople.utils.requests.post')
    def test_generate_access_token_recent_buffer_skip(self, mock_post):
        # Set last_refreshed_at to 1 minute ago
        token = ZohoPeopleFormToken.objects.latest('created')
        token.last_refreshed_at = timezone.now() - timezone.timedelta(minutes=1)
        token.save()
        
        response = generate_access_token()
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get("status"), "cached")
        # Ensure requests.post was NOT called
        self.assertEqual(mock_post.call_count, 0)

    @patch('zohopeople.utils.requests.post')
    def test_get_payees_details_success(self, mock_post):
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = {"response": "ok"}
        
        response = get_payees_details("HRM123")
        self.assertIsNotNone(response)
        self.assertEqual(response.status_code, 200)

    @patch('zohopeople.utils.requests.post')
    def test_get_payees_details_refresh_failure(self, mock_post):
        # 1. First call 401
        # 2. generate_access_token calls requests.post (returns 400)
        mock_401 = MagicMock()
        mock_401.status_code = 401
        mock_400 = MagicMock()
        mock_400.status_code = 400
        
        mock_post.side_effect = [mock_401, mock_400]
        
        response = get_payees_details("HRM123")
        self.assertIsNone(response)
