from .models import Customer,Appointment,Notification,MriScanImage,Availability,DoctorRadiologist,DoctorRadiologistNotification,RadiologistDoctor,RadiologistDoctorNotification,MedicalRecord,Recomendation,DoctorSpecialistRequest,DoctorSpecialistNotification,SpecialistDoctorResponse,SpecialistDoctorNotification,DoctorSpecialistData,SpecialistDoctorRecommendation
from rest_framework import serializers
from django.conf import settings
from drf_extra_fields.fields import Base64ImageField  # type: ignore # You need to install drf-extra-fields
from core.models import User
class CustomerSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    class Meta:
        model = Customer
        fields = ['id', 'user_id', 'first_name', 'last_name', 'phone', 'city', 'gender', 'bio', 'image','role']
class RecomendationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Recomendation
        fields='__all__'
class SpecialistDoctorRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model=SpecialistDoctorRecommendation
        fields='__all__'

class DoctorSpecialistRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=DoctorSpecialistRequest
        fields='__all__'

class SpecialistDoctorResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model=SpecialistDoctorResponse
        fields='__all__'


class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model=MedicalRecord
        fields='__all__'
class CustomCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['city', 'phone']

class MriScanImageSerializer(serializers.ModelSerializer):
    patient_first_name = serializers.SerializerMethodField()
    patient_last_name = serializers.SerializerMethodField()
    patient_city = serializers.SerializerMethodField()
    patient_Systolic_blood_pressure=serializers.SerializerMethodField()
    patient_diastolic_blood_pressure=serializers.SerializerMethodField()
    patient_blood_sugar_level=serializers.SerializerMethodField()
    # Diastolic Blood Pressure:
    patient_weight=serializers.SerializerMethodField()
    patient_phone = serializers.SerializerMethodField()
    class Meta:
        model = MriScanImage
        fields =['id','doctor','image','patient','patient_first_name','patient_last_name','patient_city','patient_phone','patient_weight','patient_Systolic_blood_pressure','patient_diastolic_blood_pressure','patient_blood_sugar_level']
    def get_patient_first_name(self, obj):
        # Access the patient object from the appointment instance and get the first name
        patient = obj.patient
        if patient:
            return patient.first_name
        return None
    def get_patient_last_name(self, obj):
        # Access the patient object from the appointment instance and get the last name
        patient = obj.patient
        if patient:
            return patient.last_name
        return None
    def get_patient_city(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'customer'):
            return patient.customer.city
        return None
    def get_patient_phone(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'customer'):
            return patient.customer.phone
        return None
    def get_patient_weight(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'medicalrecord'):
            return patient.medicalrecord.weight
        return None
    def get_patient_Systolic_blood_pressure(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'medicalrecord'):
            return patient.medicalrecord.systolic_blood_pressure
        return None
        return None
    def get_patient_diastolic_blood_pressure(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'medicalrecord'):
            return patient.medicalrecord.diastolic_blood_pressure
        return None
    def get_patient_blood_sugar_level(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'medicalrecord'):
            return patient.medicalrecord.blood_sugar_level
        return None
class RadiologistDoctorSerializer(serializers.ModelSerializer):
    patient_first_name = serializers.SerializerMethodField()
    patient_last_name = serializers.SerializerMethodField()
    patient_city = serializers.SerializerMethodField()
    patient_systolic_blood_pressure = serializers.SerializerMethodField()
    patient_diastolic_blood_pressure = serializers.SerializerMethodField()
    patient_blood_sugar_level = serializers.SerializerMethodField()
    patient_weight = serializers.SerializerMethodField()
    patient_phone = serializers.SerializerMethodField()
    patient_heart_rate=serializers.SerializerMethodField()
    patient_cholesterol_level=serializers.SerializerMethodField()
    doctor_notes=serializers.SerializerMethodField()
    class Meta:
        model = RadiologistDoctor
        fields = [
            'id', 'doctor', 'image', 'patient', 'radiologist', 'prediction',
            'patient_first_name', 'patient_last_name', 'patient_city', 'patient_phone',
            'patient_weight', 'patient_systolic_blood_pressure', 'patient_diastolic_blood_pressure', 'patient_blood_sugar_level','patient_heart_rate','patient_cholesterol_level','doctor_notes'
        ]

    def get_patient_first_name(self, obj):
        patient = obj.patient
        return patient.first_name if patient else None

    def get_patient_last_name(self, obj):
        patient = obj.patient
        return patient.last_name if patient else None

    def get_patient_city(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'customer'):
            return patient.customer.city
        return None

    def get_patient_phone(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'customer'):
            return patient.customer.phone
        return None

    def get_patient_weight(self, obj):
        return self._get_medical_record_field(obj, 'weight')

    def get_patient_systolic_blood_pressure(self, obj):
        return self._get_medical_record_field(obj, 'systolic_blood_pressure')

    def get_patient_diastolic_blood_pressure(self, obj):
        return self._get_medical_record_field(obj, 'diastolic_blood_pressure')

    def get_patient_blood_sugar_level(self, obj):
        return self._get_medical_record_field(obj, 'blood_sugar_level')
    def get_patient_heart_rate(self, obj):
        return self._get_medical_record_field(obj, 'heart_rate')
    def get_patient_cholesterol_level(self, obj):
        return self._get_medical_record_field(obj, 'cholesterol_level')
    def get_doctor_notes(self, obj):
        return self._get_medical_record_field(obj, 'doctor_notes')

    def _get_medical_record_field(self, obj, field):
        try:
            medical_record = MedicalRecord.objects.filter(patient=obj.patient).order_by('-id').first()
            return getattr(medical_record, field)
        except MedicalRecord.DoesNotExist:
            return None

class AppointmentSerializer(serializers.ModelSerializer):
    patient_first_name = serializers.SerializerMethodField()
    patient_last_name = serializers.SerializerMethodField()
    patient_city = serializers.SerializerMethodField()
    patient_phone = serializers.SerializerMethodField()
    patient_systolic_blood_pressure=serializers.SerializerMethodField()
    patient_diastolic_blood_pressure=serializers.SerializerMethodField()
    patient_blood_sugar_level=serializers.SerializerMethodField()
    patient_weight=serializers.SerializerMethodField()
    # patient_document=serializers.SerializerMethodField()
    patient_id=serializers.IntegerField()
    specialist_id=serializers.IntegerField()
    
    class Meta:
        model = Appointment
        fields = ['id', 'appointment_datetime', 'reason', 'notes', 'patient_id', 'specialist_id', 'patient_first_name', 'patient_last_name', 'patient_city', 'patient_phone','patient_weight','patient_systolic_blood_pressure','patient_diastolic_blood_pressure','patient_blood_sugar_level']
    def get_patient_first_name(self, obj):
        # Access the patient object from the appointment instance and get the first name
        patient = obj.patient
        if patient:
            return patient.first_name
        return None
    def get_patient_last_name(self, obj):
        # Access the patient object from the appointment instance and get the last name
        patient = obj.patient
        if patient:
            return patient.last_name
        return None
    def get_patient_city(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'customer'):
            return patient.customer.city
        return None

    def get_patient_phone(self, obj):
        patient = obj.patient
        if patient and hasattr(patient, 'customer'):
            return patient.customer.phone
        return None
    def get_patient_weight(self, obj):
        return self._get_medical_record_field(obj, 'weight')
    def get_patient_systolic_blood_pressure(self, obj):
        return self._get_medical_record_field(obj, 'systolic_blood_pressure')

    def get_patient_diastolic_blood_pressure(self, obj):
        return self._get_medical_record_field(obj, 'diastolic_blood_pressure')

    def get_patient_blood_sugar_level(self, obj):
        return self._get_medical_record_field(obj, 'blood_sugar_level')
    def _get_medical_record_field(self, obj, field):
        try:
            medical_record = MedicalRecord.objects.filter(patient=obj.patient).order_by('-id').first()
            return getattr(medical_record, field)
        except MedicalRecord.DoesNotExist:
            return None
class DoctorRadiologistSerializer(serializers.ModelSerializer):
    patient_first_name = serializers.SerializerMethodField()
    patient_last_name = serializers.SerializerMethodField()
    patient_city = serializers.SerializerMethodField()
    patient_phone = serializers.SerializerMethodField()
    patient_systolic_blood_pressure = serializers.SerializerMethodField()
    patient_diastolic_blood_pressure = serializers.SerializerMethodField()
    patient_blood_sugar_level = serializers.SerializerMethodField()
    patient_weight = serializers.SerializerMethodField()
    patient_heart_rate=serializers.SerializerMethodField()
    patient_cholesterol_level=serializers.SerializerMethodField()
    doctor_notes=serializers.SerializerMethodField()
    patient_id=serializers.IntegerField()
    doctor_id=serializers.IntegerField()
    radiologist_id=serializers.IntegerField()
    class Meta:
        model = DoctorRadiologist
        fields = [
            'id', 'reason', 'notes','patient_id', 'doctor_id', 'radiologist_id', 
            'patient_first_name', 'patient_last_name', 'patient_city', 'patient_phone',
            'patient_weight', 'patient_systolic_blood_pressure', 
            'patient_diastolic_blood_pressure', 'patient_blood_sugar_level','patient_heart_rate','patient_cholesterol_level','doctor_notes'
        ]

    def get_patient_first_name(self, obj):
        return obj.patient.first_name if obj.patient else None
    def get_patient_last_name(self, obj):
        return obj.patient.last_name if obj.patient else None

    def get_patient_city(self, obj):
        return obj.patient.customer.city if obj.patient and hasattr(obj.patient, 'customer') else None

    def get_patient_phone(self, obj):
        return obj.patient.customer.phone if obj.patient and hasattr(obj.patient, 'customer') else None
    def get_patient_weight(self, obj):
        return self._get_medical_record_field(obj, 'weight')
    def get_patient_systolic_blood_pressure(self, obj):
        return self._get_medical_record_field(obj, 'systolic_blood_pressure')

    def get_patient_diastolic_blood_pressure(self, obj):
        return self._get_medical_record_field(obj, 'diastolic_blood_pressure')

    def get_patient_blood_sugar_level(self, obj):
        return self._get_medical_record_field(obj, 'blood_sugar_level')
    def get_patient_heart_rate(self, obj):
        return self._get_medical_record_field(obj, 'heart_rate')
    def get_patient_cholesterol_level(self, obj):
        return self._get_medical_record_field(obj, 'cholesterol_level')
    def get_doctor_notes(self, obj):
        return self._get_medical_record_field(obj, 'doctor_notes')

    def _get_medical_record_field(self, obj, field):
        try:
            medical_record = MedicalRecord.objects.filter(patient=obj.patient).order_by('-id').first()
            return getattr(medical_record, field)
        except MedicalRecord.DoesNotExist:
            return None
class DoctorSpecialistDataSerializer(serializers.ModelSerializer):
    patient_first_name = serializers.SerializerMethodField()
    patient_last_name = serializers.SerializerMethodField()
    patient_city = serializers.SerializerMethodField()
    patient_phone = serializers.SerializerMethodField()
    patient_systolic_blood_pressure = serializers.SerializerMethodField()
    patient_diastolic_blood_pressure = serializers.SerializerMethodField()
    patient_blood_sugar_level = serializers.SerializerMethodField()
    patient_weight = serializers.SerializerMethodField()
    patient_heart_rate=serializers.SerializerMethodField()
    patient_cholesterol_level=serializers.SerializerMethodField()
    doctor_notes=serializers.SerializerMethodField()
    patient_model_prediction=serializers.SerializerMethodField()
    # patient_mir_scan_image=serializers.SerializerMethodField()
    # patient_mir_scan_image = serializers.ImageField(source='image', read_only=True)
    patient_radiologist_note=serializers.SerializerMethodField()
    # patient_mir_scan_image = serializers.ImageField(source='get_image_url', read_only=True)


    patient_id=serializers.IntegerField()
    doctor_id=serializers.IntegerField()
    specialist_id=serializers.IntegerField()
    class Meta:
        model = DoctorSpecialistData
        fields = [
            'id', 'reason','patient_id', 'doctor_id', 'specialist_id', 
            'patient_first_name', 'patient_last_name', 'patient_city', 'patient_phone',
            'patient_weight', 'patient_systolic_blood_pressure', 
            'patient_diastolic_blood_pressure', 'patient_blood_sugar_level','patient_heart_rate','patient_cholesterol_level','doctor_notes','patient_model_prediction','patient_radiologist_note'
        ]

    def get_patient_first_name(self, obj):
        return obj.patient.first_name if obj.patient else None
    def get_patient_last_name(self, obj):
        return obj.patient.last_name if obj.patient else None

    def get_patient_city(self, obj):
        return obj.patient.customer.city if obj.patient and hasattr(obj.patient, 'customer') else None
    def get_patient_phone(self, obj):
        return obj.patient.customer.phone if obj.patient and hasattr(obj.patient, 'customer') else None
    def get_patient_weight(self, obj):
        return self._get_medical_record_field(obj, 'weight')
    def get_patient_systolic_blood_pressure(self, obj):
        return self._get_medical_record_field(obj, 'systolic_blood_pressure')

    def get_patient_diastolic_blood_pressure(self, obj):
        return self._get_medical_record_field(obj, 'diastolic_blood_pressure')

    def get_patient_blood_sugar_level(self, obj):
        return self._get_medical_record_field(obj, 'blood_sugar_level')
    def get_patient_heart_rate(self, obj):
        return self._get_medical_record_field(obj, 'heart_rate')
    def get_patient_cholesterol_level(self, obj):
        return self._get_medical_record_field(obj, 'cholesterol_level')
    def get_doctor_notes(self, obj):
        return self._get_medical_record_field(obj, 'doctor_notes')
    def get_patient_model_prediction(self, obj):
        return self._get_radiologist_field(obj, 'prediction')
   
    def get_patient_radiologist_note(self, obj):
        return self._get_radiologist_field(obj, 'reccommendation')
    def _get_medical_record_field(self, obj, field):
        try:
            medical_record = MedicalRecord.objects.filter(patient=obj.patient).order_by('-id').first()
            return getattr(medical_record, field)
        except MedicalRecord.DoesNotExist:
            return None
    def _get_radiologist_field(self, obj, field):
        try:
            radiologist_data = RadiologistDoctor.objects.filter(patient=obj.patient).order_by('-id').first()
            return getattr(radiologist_data, field)
        except (DoctorRadiologist.DoesNotExist,DoctorRadiologist.DoesNotExist, UnicodeEncodeError):
            return None
class NotificationSerializer(serializers.ModelSerializer):
    recipient_id = serializers.IntegerField()
    patient_id = serializers.IntegerField()
    message = serializers.CharField( read_only=True)
    class Meta:
        model = Notification
        fields = ['id', 'recipient_id', 'patient_id', 'message', 'created_at']

class DoctorRadiologistNotificationSerializer(serializers.ModelSerializer):
    recipient_id = serializers.IntegerField()
    doctor_id = serializers.IntegerField()
    message = serializers.CharField( read_only=True)
    class Meta:
        model = DoctorRadiologistNotification
        fields = ['id', 'recipient_id', 'doctor_id', 'message', 'created_at']
class SpecialistDoctorNotificationSerializer(serializers.ModelSerializer):
    recipient_id = serializers.IntegerField()
    specialist_id = serializers.IntegerField()
    message = serializers.CharField( read_only=True)
    class Meta:
        model = SpecialistDoctorNotification
        fields = ['id', 'recipient_id', 'specialist_id', 'message', 'created_at']


class DoctorSpecialistNotificationSerializer(serializers.ModelSerializer):
    recipient_id = serializers.IntegerField()
    doctor_id = serializers.IntegerField()
    message = serializers.CharField( read_only=True)
    class Meta:
        model = DoctorSpecialistNotification
        fields = ['id', 'recipient_id', 'doctor_id', 'message', 'created_at']

class RadiologistDoctorNotificationSerializer(serializers.ModelSerializer):
    recipient_id = serializers.IntegerField()
    radiologist_id = serializers.IntegerField()
    message = serializers.CharField( read_only=True)
    class Meta:
        model = RadiologistDoctorNotification
        fields = ['id', 'recipient_id', 'radiologist_id', 'message', 'created_at']


class AvailabilitySerializer(serializers.ModelSerializer):
    start_time_formatted = serializers.SerializerMethodField()
    end_time_formatted = serializers.SerializerMethodField()
    class Meta:
        model = Availability
        fields = ['id', 'doctor', 'day', 'date', 'start_time', 'end_time', 'start_time_formatted', 'end_time_formatted']
    def get_start_time_formatted(self, obj):
        return obj.start_time.strftime('%I:%M %p')
    def get_end_time_formatted(self, obj):
        return obj.end_time.strftime('%I:%M %p')


