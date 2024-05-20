from django.contrib import admin
from .models import Customer,Appointment,Notification,MriScanImage,DoctorRadiologist,DoctorRadiologistNotification,Availability

# Register your models here.
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'phone', 'gender', 'city','role']
    list_per_page=10
    list_select_related = ['user']
    ordering = ['user__first_name', 'user__last_name']  
    search_fields = ['user__first_name', 'user__last_name']
@admin.register(MriScanImage)
class MriScanImageAdmin(admin.ModelAdmin):
    list_display = ['id','image','patient_id']
    list_per_page=10
@admin.register(DoctorRadiologist)
class DoctorRadiologistAdmin(admin.ModelAdmin):
    list_display = ['id','doctor_id','patient_id','radiologist_id','reason','notes']
    list_per_page=10
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['id','appointment_datetime','reason','notes','status']
    list_per_page=10

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['recipient', 'patient_id', 'message', 'created_at', 'read']
    list_per_page=10
    list_select_related = ['recipient']
    ordering = ['-created_at']
    search_fields = ['recipient__first_name', 'recipient__last_name']


@admin.register(DoctorRadiologistNotification)
class DoctorRadiologistNotificationAdmin(admin.ModelAdmin):
    list_display = ['doctor_id', 'recipient', 'message', 'created_at', 'read']
    list_per_page=10
    list_select_related = ['recipient']
    ordering = ['-created_at']
    search_fields = ['recipient__first_name', 'recipient__last_name']


@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ['doctor_id', 'day', 'start_time', 'end_time']
    list_per_page=10




# @admin.register(PatientInfo)
# class PatientInfoAdmin(admin.ModelAdmin):
#     list_display = ['id','user_id','weight','blood_sugar_level','systolic_blood_pressure','odf_file']
#     list_per_page=10


