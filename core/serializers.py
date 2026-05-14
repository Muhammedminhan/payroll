from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Payslip, Document, AdminNotification, WikiCategory, WikiPage, UserNotification

class UserNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNotification
        fields = '__all__'

class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            import base64
            import uuid
            from django.core.files.base import ContentFile
            # Decode the base64 string
            try:
                format, imgstr = data.split(';base64,')
                ext = format.split('/')[-1]
                file_name = f"{uuid.uuid4().hex[:10]}.{ext}"
                data = ContentFile(base64.b64decode(imgstr), name=file_name)
            except Exception:
                raise serializers.ValidationError("Invalid image format")
        return super().to_internal_value(data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    profile_picture = Base64ImageField(required=False, allow_null=True)
    
    class Meta:
        model = Profile
        fields = '__all__'

    def update(self, instance, validated_data):
        # Extract name data
        first_name = validated_data.pop('first_name', None)
        last_name = validated_data.pop('last_name', None)
        
        # Update User model if name is provided
        user = instance.user
        updated_user = False
        if first_name is not None:
            user.first_name = first_name
            updated_user = True
        if last_name is not None:
            user.last_name = last_name
            updated_user = True
        
        if updated_user:
            user.save()
            
        # Explicitly handle profile_picture deletion/update
        if 'profile_picture' in validated_data:
            pic_data = validated_data.get('profile_picture')
            if pic_data is None:
                if instance.profile_picture:
                    instance.profile_picture.delete(save=False)
                instance.profile_picture = None
            else:
                instance.profile_picture = pic_data
            
        return super().update(instance, validated_data)

class PayslipSerializer(serializers.ModelSerializer):
    consultant_id = serializers.CharField(source='user.profile.consultant_id', read_only=True)
    account_number = serializers.CharField(source='user.profile.account_number', read_only=True)
    ifsc_code = serializers.CharField(source='user.profile.ifsc_code', read_only=True)
    bank_name = serializers.CharField(source='user.profile.branch_address', read_only=True) # Using branch_address as proxy for bank info if needed
    
    class Meta:
        model = Payslip
        fields = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
        read_only_fields = ['user', 'status', 'admin_feedback', 'updated_at']

class AdminNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminNotification
        fields = '__all__'

class WikiCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WikiCategory
        fields = '__all__'

class WikiPageSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = WikiPage
        fields = '__all__'
        read_only_fields = ['author', 'slug']
