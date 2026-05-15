import logging
from celery import shared_task
from .models import Payee
from zohopeople.utils import get_payees_details

# For getting the named logger
logger = logging.getLogger('celery_debug')


# To fetch payee details from zoho people
@shared_task
def fetch_details(payee_id):
    try:
        payee = Payee.objects.get(hrm_id=payee_id)
    except Payee.DoesNotExist:
        logger.error(f"Payee with HRM ID {payee_id} not found locally. Skipping Zoho call.")
        return

    try:
        response = get_payees_details(payee_id)
        if response and response.status_code == 200:
            response_data = response.json()
            # Navigate the nested dictionary safely
            res_obj = response_data.get("response", {})
            result_list = res_obj.get("result", [])
            if result_list:
                response_data_list = result_list[0]
            else:
                logger.warning(f"No result found in Zoho for payee {payee_id}")
                response_data_list = {}
        else:
            logger.warning(f"Zoho API returned status {response.status_code if response else 'None'} for {payee_id}")
            response_data_list = {}
    except Exception as e:
        logger.error(f"Error in fetch_details for {payee_id}: {e}")
        response_data_list = {}
    
    if response_data_list:
        # Find the specific data key
        fetched_data = response_data_list.get('Employee', [])
        if isinstance(fetched_data, list) and fetched_data:
            fetched_data = fetched_data[0]
        else:
            # Fallback heuristic if key changes
            fetched_data = None
            for key, value in response_data_list.items():
                if isinstance(value, list) and value:
                    fetched_data = value[0]
                    break
        
        if fetched_data:
            # Only update if value is present in Zoho (don't overwrite with None)
            full_name = f"{fetched_data.get('FirstName', '')} {fetched_data.get('LastName', '')}".strip()
            if full_name:
                payee.full_name = full_name
            
            email = fetched_data.get("EmailID")
            if email:
                payee.email = email
                
            pan = fetched_data.get("Pan_Number")
            if pan:
                payee.pan_no = pan
                
            addr = fetched_data.get("Permanent_Address")
            if addr:
                payee.address = addr
                
            doj = fetched_data.get("Dateofjoining")
            if doj:
                payee.date_of_joining = doj
                
            payee.save()
        else:
            logger.warning(f"Could not find valid payee data list in Zoho response for {payee_id}")
