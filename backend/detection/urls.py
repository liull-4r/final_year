from django.urls import path, include
from rest_framework import routers
from . import views

# Create a router object
router = routers.DefaultRouter()
# Register your ViewSet with the s
router.register('customers', views.CustomerViewSet)
router.register('appointments', views.AppointmentViewSet)
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
