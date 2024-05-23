from django.db import models
from django.conf import settings
from django.contrib import admin
from .validators import validate_file_size
class Customer(models.Model):
    GENDER_MALE = "Male"
    GENDER_FEMALE = "Female"
    GENDER_CHOICES = [
        (GENDER_MALE, 'Male'),
        (GENDER_FEMALE, 'Female'),
    ]
    ROLE_DOCTOR="Doctor"
    ROLE_PATIENT="Patient"
    ROLE_SPECIALIST="Specialist"
    ROLE_RADIOLOGIST="Radiologist"
    
    ROLE_CHOICES = [
        (ROLE_DOCTOR, 'Doctor'),
        (ROLE_PATIENT, 'Patient'),
        (ROLE_SPECIALIST, 'Specialist'),
        (ROLE_RADIOLOGIST, 'Radiologist'),
    ]
    phone = models.CharField(max_length=15)
    city = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    bio=models.TextField(null=True,blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    @admin.display(ordering='user__last_name')
    def last_name(self):
        if self.user:
            return self.user.last_name
        else:
            return "No User"  # or any default value you prefer if user is None

    @admin.display(ordering='user__first_name')
    def first_name(self):
        if self.user:
            return self.user.first_name
        else:
            return "No User"  # or any default value you prefer if user is None
        
class MriScanImage(models.Model):
    image = models.ImageField(upload_to='scans/', validators=[validate_file_size])
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_images')
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_images')
    def __str__(self):
        return f"Image for {self.patient.username} with {self.doctor.username}"

class Appointment(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_appointments')
    specialist = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='specialist_patient_appointments')
    appointment_datetime = models.DateTimeField()
    reason = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=[('Scheduled', 'Scheduled'), ('Cancelled', 'Cancelled'), ('Completed', 'Completed')], default='Scheduled')
    def __str__(self):
        return f"Appointment for {self.patient.username} with {self.doctor.username} at {self.appointment_datetime}"
        
class DoctorRadiologist(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_radiologist_appointments')
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_radiologist_appointments')
    radiologist= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='radiologist_appointments')
    reason = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    def __str__(self):
        return f"Message for {self.patient.username} with {self.radiologist.username}"

class DoctorSpecialistData(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_specialist_appointments')
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_specialist_appointments')
    specialist= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='specialist_appointments')
    reason = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return f"Message for {self.patient.username} with {self.specialist.username}"


















class RadiologistDoctor(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_doctor_appointments')
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_doctor_appointments')
    radiologist= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='radiologist_doctor_appointments')
    prediction = models.TextField()
    image = models.ImageField(upload_to='scanstodoctor/', validators=[validate_file_size])
    recommendation = models.TextField(blank=False)

    def __str__(self):
        return f"Message for {self.patient.username} with {self.radiologist.username}"
        
class Notification(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    patient_id = models.IntegerField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
class DoctorRadiologistNotification(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    doctor_id = models.IntegerField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
class RadiologistDoctorNotification(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    radiologist_id = models.IntegerField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

class DoctorSpecialistRequest(models.Model):
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_requests')
    specialist = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='specialist_requests')
    message = models.TextField()

class SpecialistDoctorResponse(models.Model):
    specialist = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='specialist_responses')
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_responses')
    message = models.TextField()
class SpecialistDoctorRecommendation(models.Model):
    specialist = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='specialist_recommendations')
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_recommendations')
    patient= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_recommendations')
    recommendation = models.TextField()




class DoctorSpecialistNotification(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    doctor_id = models.IntegerField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
class SpecialistDoctorNotification(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    specialist_id = models.IntegerField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

















class Availability(models.Model):
    DAYS_OF_WEEK = [
        ('MONDAY', 'Monday'),
        ('TUESDAY', 'Tuesday'),
        ('WEDNESDAY', 'Wednesday'),
        ('THURSDAY', 'Thursday'),
        ('FRIDAY', 'Friday'),
        ('SATURDAY', 'Saturday'),
        ('SUNDAY', 'Sunday'),
    ]
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    day = models.CharField(max_length=10, choices=DAYS_OF_WEEK)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
class Recomendation(models.Model):
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='doctor_recomendation')
    user= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='patient_recomendation')
    recommendation = models.TextField()
    def __str__(self) -> str:
        return f"{self.user.first_name} {self.user.last_name}"

class MedicalRecord(models.Model):
    doctor= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='doctor_records')
    patient= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='patient_records')
    weight = models.FloatField()  # Weight in kilograms
    systolic_blood_pressure = models.IntegerField()
    diastolic_blood_pressure = models.IntegerField()
    blood_sugar_level = models.FloatField()  # Blood sugar level in mg/dL
    heart_rate = models.IntegerField()  # Heart rate in bpm
    cholesterol_level = models.FloatField()  # Cholesterol level in mg/dL
    doctor_notes = models.TextField(blank=True, null=True)
    def __str__(self):
        return f"{self.patient_name}"