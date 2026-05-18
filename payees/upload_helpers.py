import os
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.text import get_valid_filename
from PIL import Image


def validate_image(file):
    try:
        img = Image.open(file)
        img.verify()
        # Reset file pointer after verify() as it consumes the stream
        file.seek(0)
    except (IOError, SyntaxError, Image.UnidentifiedImageError) as e:
        raise ValidationError(f"The uploaded file is not a valid image: {e}")


def user_directory_path(instance, filename):
    # File will be uploaded to MEDIA_ROOT/uploads/payees/bank-acknowledgement/user_<hrm_id>/<filename>
    base_filename, file_extension = os.path.splitext(filename)
    safe_base = get_valid_filename(base_filename)
    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
    safe_filename = f"{safe_base}_{timestamp}{file_extension}"
    return f"uploads/payees/bank-acknowledgement/user_" \
           f"{instance.payee.hrm_id}/{safe_filename}"
