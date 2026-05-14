from django.contrib import admin
from .models import Profile, Payslip, Document, AdminNotification, WikiCategory, WikiPage, UserNotification

@admin.register(WikiCategory)
class WikiCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(WikiPage)
class WikiPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author', 'updated_at')
    list_filter = ('category', 'author')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'designation', 'consultant_id')
    search_fields = ('user__username', 'user__email', 'consultant_id')

@admin.register(Payslip)
class PayslipAdmin(admin.ModelAdmin):
    list_display = ('user', 'month', 'year', 'take_home')
    list_filter = ('month', 'year')
    search_fields = ('user__username',)

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'status', 'updated_at')
    list_filter = ('status',)
    search_fields = ('user__username', 'title')

@admin.register(AdminNotification)
class AdminNotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'created_at')
    list_filter = ('is_active',)

@admin.register(UserNotification)
class UserNotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'notification_type', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read')
    search_fields = ('user__username', 'title')
