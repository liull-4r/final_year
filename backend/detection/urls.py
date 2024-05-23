from django.urls import path, include
from rest_framework import routers
from . import views

# Create a router object
router = routers.DefaultRouter()
# Register your ViewSet with the s
router.register('customers', views.CustomerViewSet)
router.register('appointments', views.AppointmentViewSet)

router.register('doctorspecialistrequest', views.DoctorSpecialistRequestViewSet)
router.register('specialistdoctorresponse', views.SpecialistDoctorResponseViewSet)
router.register('getpatientsfrommedicalrecord',views.GetPatientBasedOnMedicalRecordViewSet,basename='get-patient-based-on-medical-record')
router.register('getpatientsfromradiologist',views.GetPatientBasedOnRadiologistViewSet,basename='get-patient-based-on-radiologist')
router.register('getpatientsfromdoctorspecialistdata',views.GetPatientBasedOnDoctorSpecialistDataViewSet,basename='get-patient-based-on-doctor-specialist-data')
router.register('doctorspecialistdata', views.DoctorSpecialistDataViewSet)
router.register('specialistrecommendation', views.SpecialistDoctorRecommendationViewSet)
router.register('doctorspecialistnotifications', views.DoctorSpecialistNotificationViewSet,basename='doctor-specialist-notification')
router.register('specialistdoctornotifications', views.SpecialistDoctorNotificationViewSet,basename='specialist-doctor-notification')
router.register('radiologistdoctor', views.RadiologistDoctorViewSet)
router.register('radiologistdoctornotifications', views.RadiologistDoctorNotificationViewSet)
router.register('doctorradiologist', views.DoctorRadiologistViewSet)
router.register('medicalrecords', views.MedicalRecordViewSet,basename='medicalrecord')
router.register('doctorradiologistnotifications', views.DoctorRadiologistNotificationViewSet)
router.register('notifications', views.NotificationViewSet)
router.register('scans', views.MriScanImageViewSet)
router.register('availability', views.AvailablityViewSet)
router.register('info', views.PatientInfoViewSet, basename='patient-info')
# Include the router's URLs in your urlpatterns
urlpatterns = [
    path('', include(router.urls)),
]
