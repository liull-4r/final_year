from django.contrib import admin
from .models import Customer,Appointment,DoctorRadiologist,DoctorRadiologistNotification,RadiologistDoctor,RadiologistDoctorNotification,Recomendation,DoctorSpecialistData,DoctorSpecialistNotification,DoctorSpecialistRequest,SpecialistDoctorNotification,SpecialistDoctorRecommendation,SpecialistDoctorResponse,MedicalRecord

# Register your models here.
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'phone', 'gender', 'city','role']
    list_per_page=10
    list_select_related = ['user']
    ordering = ['user__first_name', 'user__last_name']  
    search_fields = ['user__first_name', 'user__last_name']
@admin.register(DoctorRadiologist)
class DoctorRadiologistAdmin(admin.ModelAdmin):
    list_display = ['id','doctor_id','patient_id','radiologist_id','notes']
    list_per_page=10
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['id','appointment_datetime','notes','status']
    list_per_page=10




@admin.register(DoctorRadiologistNotification)
class DoctorRadiologistNotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'message', 'created_at', 'read']
    list_per_page=10
    # list_select_related = ['recipient']
    # ordering = ['-created_at']
    # search_fields = ['recipient__first_name', 'recipient__last_name']


@admin.register(RadiologistDoctorNotification)
class RadiologistDoctorNotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'message', 'created_at', 'read']
    list_per_page=10
@admin.register(DoctorSpecialistNotification)
class DoctorSpecialistNotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'message', 'created_at', 'read']
    list_per_page=10
@admin.register(SpecialistDoctorNotification)
class SpecialistDoctorNotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'message', 'created_at', 'read']
    list_per_page=10


# @admin.register(Availability)
# class AvailabilityAdmin(admin.ModelAdmin):
#     list_display = ['doctor_id', 'day', 'start_time', 'end_time']
#     list_per_page=10
@admin.register(RadiologistDoctor)
class RadiologistDoctorAdmin(admin.ModelAdmin):
    list_display = ['id', 'prediction', 'recommendation']
    list_per_page=10
@admin.register(Recomendation)
class RecomendationAdmin(admin.ModelAdmin):
    list_display = ['id','recommendation']
    list_per_page=10
@admin.register(DoctorSpecialistData)
class DoctorSpecialistDataAdmin(admin.ModelAdmin):
    list_display = ['id','message']
    list_per_page=10
@admin.register(DoctorSpecialistRequest)
class DoctorSpecialistRequestAdmin(admin.ModelAdmin):
    list_display = ['id','message']
    list_per_page=10
@admin.register(SpecialistDoctorRecommendation)
class SpecialistDoctorRecommendationAdmin(admin.ModelAdmin):
    list_display = ['id','recommendation']
    list_per_page=10
@admin.register(SpecialistDoctorResponse)
class SpecialistDoctorResponseAdmin(admin.ModelAdmin):
    list_display = ['id','message']
    list_per_page=10
@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ['id','weight','systolic_blood_pressure','diastolic_blood_pressure','blood_sugar_level']
    list_per_page=10




# @admin.register(PatientInfo)
# class PatientInfoAdmin(admin.ModelAdmin):
#     list_display = ['id','user_id','weight','blood_sugar_level','systolic_blood_pressure','odf_file']
#     list_per_page=10
# @admin.register(MriScanImage)
# class MriScanImageAdmin(admin.ModelAdmin):
#     list_display = ['id','image','patient_id']
#     list_per_page=10
# @admin.register(Notification)
# class NotificationAdmin(admin.ModelAdmin):
#     list_display = ['recipient', 'patient_id', 'message', 'created_at', 'read']
#     list_per_page=10
#     list_select_related = ['recipient']
#     ordering = ['-created_at']
#     search_fields = ['recipient__first_name', 'recipient__last_name']

