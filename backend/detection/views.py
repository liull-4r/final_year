from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
import time
import logging
from socket import gaierror
from smtplib import SMTPException
from django.core.mail import send_mail
logger = logging.getLogger(__name__)
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.mixins import CreateModelMixin,RetrieveModelMixin,UpdateModelMixin
from rest_framework.viewsets import ModelViewSet,GenericViewSet
from .models import Customer,Appointment,Notification,Recomendation,DoctorRadiologist,DoctorRadiologistNotification,RadiologistDoctor,RadiologistDoctorNotification,MedicalRecord,DoctorSpecialistRequest,DoctorSpecialistNotification,SpecialistDoctorNotification,SpecialistDoctorResponse,DoctorSpecialistData,SpecialistDoctorRecommendation,DoctorPatientMessage,DoctorPatientMessageNotification
from .serializers import CustomerSerializer,AppointmentSerializer,NotificationSerializer,RecomendationSerializer,DoctorRadiologistSerializer,DoctorRadiologistNotificationSerializer,RadiologistDoctorSerializer,RadiologistDoctorNotificationSerializer,MedicalRecordSerializer,DoctorSpecialistRequestSerializer,SpecialistDoctorResponseSerializer,DoctorSpecialistDataSerializer,SpecialistDoctorRecommendationSerializer,DoctorSpecialistNotificationSerializer,SpecialistDoctorNotificationSerializer,GetSpecialistSerializer,DoctorPatientMessageSerializer,DoctorPatientMessageNotificationSerializer
from rest_framework.decorators import action
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import MethodNotAllowed
from django.core.mail import send_mail
from django.contrib.auth import get_user_model

def send_email_with_retry(subject, message, from_email, recipient_list, retries=3, delay=5):
    for i in range(retries):
        try:
            send_mail(subject, message, from_email, recipient_list, fail_silently=False)
            return
        except (SMTPException, gaierror) as e:
            logger.warning(f"Attempt {i+1} to send email failed: {e}")
            if i < retries - 1:
                time.sleep(delay)  # Wait before retrying
            else:
                logger.error(f"All {retries} attempts to send email failed")
                raise e  # Raise the exception if all retries fail

class RadiologistDoctorViewSet(ModelViewSet):
    queryset = RadiologistDoctor.objects.select_related('doctor', 'patient','radiologist').all()
    serializer_class = RadiologistDoctorSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        mriscanimage = serializer.save()
        # Retrieve patient and doctor objects
        doctor_id = serializer.validated_data['doctor'].id
        patient_id = serializer.validated_data['patient'].id
        radiologist_id = serializer.validated_data['radiologist'].id
        User = get_user_model()
        doctor = User.objects.get(id=doctor_id)
        patient = User.objects.get(id=patient_id)
        radiologist= User.objects.get(id=radiologist_id)
        
        # Construct message with patient's first name and last name
        patient_name = f"{patient.first_name} {patient.last_name}"
        message = f"New Information Upload from Radiologist {radiologist.first_name} {radiologist.last_name} for scan image (ID: {mriscanimage.id}) scheduled for patient {patient_name}. Please review."
        RadiologistDoctorNotification.objects.create(recipient=doctor, radiologist_id=radiologist_id, message=message)
        # Send email notification with retry logic
        sender_email = "fetamasr@gmail.com"
        recipient_email = doctor.email
        try:
            send_email_with_retry(
                'New MRI Scan Image Notification',
                message,
                sender_email,
                [recipient_email],
                retries=3,
                delay=5,
            )
        except Exception as e:
            logger.error(f"Failed to send email notification after multiple attempts: {e}")

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class GetPatientBasedOnRadiologistViewSet(ModelViewSet):
    serializer_class = DoctorRadiologistSerializer
    def get_queryset(self):
        radiologist_id = self.request.query_params.get('radiologist_id')
        if radiologist_id:
            return DoctorRadiologist.objects.filter(radiologist_id=radiologist_id)
        return DoctorRadiologist.objects.none()




class AppointmentViewSet(ModelViewSet):
    queryset = Appointment.objects.select_related('specialist', 'patient').all()
    serializer_class = AppointmentSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        appointment = serializer.save()
        specialist_id = serializer.validated_data['specialist_id']
        patient_id = serializer.validated_data['patient_id']
        User = get_user_model()
        specialist = User.objects.get(id=specialist_id)
        patient = User.objects.get(id=patient_id)
        patient_name = f"{patient.first_name} {patient.last_name}"
        formatted_datetime = serializer.validated_data['appointment_datetime'].strftime('%A, %B %d, %Y at %I:%M %p')
        message = f"New appointment (ID: {appointment.id}) scheduled for patient {patient_name} on {formatted_datetime}"
        Notification.objects.create(recipient=patient, specialist_id=specialist_id, message=message)
        
        sender_email = "fetamasr@gmail.com"
        recipient_email = patient.email
        try:
            send_email_with_retry(
                'New Appointment Notification From Specialist',
                message,
                sender_email,
                [recipient_email],
                retries=3,
                delay=5,
            )
        except Exception as e:
            logger.error(f"Failed to send email notification after multiple attempts: {e}")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def get_queryset(self):
        specialist_id = self.request.query_params.get('specialist_id')
        if specialist_id:
            return Appointment.objects.filter(specialist_id=specialist_id)
        return Appointment.objects.all()
    




class GetAppointementListBasedOnPatientViewSet(ModelViewSet):
    queryset = Appointment.objects.select_related('specialist', 'patient').all()
    serializer_class = GetSpecialistSerializer
    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        if patient_id:
            return Appointment.objects.filter(patient_id=patient_id)
        return Appointment.objects.all()



class DoctorRadiologistViewSet(ModelViewSet):
    queryset = DoctorRadiologist.objects.select_related('doctor', 'patient','radiologist').all()
    serializer_class = DoctorRadiologistSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        appointment = serializer.save()
        doctor_id = serializer.validated_data['doctor_id']
        patient_id = serializer.validated_data['patient_id']
        radiologist_id = serializer.validated_data['radiologist_id']
        User = get_user_model()
        doctor = User.objects.get(id=doctor_id)
        patient = User.objects.get(id=patient_id)
        radiologist = User.objects.get(id=radiologist_id)
        patient_name = f"{patient.first_name} {patient.last_name}"
        message = f"New Message From Doctor (ID: {appointment.id}) scheduled for patient {patient_name}"
        DoctorRadiologistNotification.objects.create(recipient=radiologist, doctor_id=doctor_id, message=message)
        sender_email = "fetamasr@gmail.com"
        recipient_email = radiologist.email
        try:
            send_email_with_retry(
                'Please See This Patient MRI Scan Image',
                message,
                sender_email,
                [recipient_email],
                retries=3,
                delay=5,
            )
        except Exception as e:
            logger.error(f"Failed to send email notification after multiple attempts: {e}")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        if patient_id:
            return DoctorRadiologist.objects.filter(patient_id=patient_id)
        return DoctorRadiologist.objects.all()
    






    
class DoctorSpecialistDataViewSet(ModelViewSet):
    queryset = DoctorSpecialistData.objects.select_related('doctor', 'patient','specialist').all()
    serializer_class = DoctorSpecialistDataSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctorspecialistdata = serializer.save()
        doctor_id = serializer.validated_data['doctor_id']
        patient_id = serializer.validated_data['patient_id']
        specialist_id = serializer.validated_data['specialist_id']
        User = get_user_model()
        doctor = User.objects.get(id=doctor_id)
        patient = User.objects.get(id=patient_id)
        specialist = User.objects.get(id=specialist_id)
        doctor_name = f"{doctor.first_name} {doctor.last_name}"
        message = f"New Message From Doctor for data sending (ID: {doctorspecialistdata.id})  from doctor {doctor_name} for patient {patient.first_name} {patient.last_name}"
        DoctorSpecialistNotification.objects.create(recipient=specialist, doctor_id=doctor_id, message=message)
        sender_email = "fetamasr@gmail.com"
        recipient_email = specialist.email
        try:
            send_email_with_retry(
                'Please Scan This Patient MRI Scan Image',
                message,
                sender_email,
                [recipient_email],
                retries=3,
                delay=5,
            )
        except Exception as e:
            logger.error(f"Failed to send email notification after multiple attempts: {e}")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        if patient_id:
            return DoctorSpecialistData.objects.filter(patient_id=patient_id)
        return DoctorSpecialistData.objects.all()
class GetPatientBasedOnDoctorSpecialistDataViewSet(ModelViewSet):
    serializer_class = DoctorSpecialistDataSerializer
    def get_queryset(self):
        specialist_id = self.request.query_params.get('specialist_id')
        if specialist_id:
            return DoctorSpecialistData.objects.filter(specialist_id=specialist_id)
        return DoctorSpecialistData.objects.none()























class NotificationViewSet(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        doctor_id = self.request.query_params.get('doctor_id')
        if doctor_id:
            queryset = queryset.filter(recipient_id=doctor_id)
        return queryset
class DoctorRadiologistNotificationViewSet(ModelViewSet):
    queryset = DoctorRadiologistNotification.objects.all()
    serializer_class = DoctorRadiologistNotificationSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        radiologist_id = self.request.query_params.get('radiologist_id')
        if radiologist_id:
            queryset = queryset.filter(recipient_id=radiologist_id)
        return queryset
class RadiologistDoctorNotificationViewSet(ModelViewSet):
    queryset = RadiologistDoctorNotification.objects.all()
    serializer_class = RadiologistDoctorNotificationSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        doctor_id = self.request.query_params.get('doctor_id')
        if doctor_id:
            queryset = queryset.filter(recipient_id=doctor_id)
        return queryset
    
class DoctorSpecialistNotificationViewSet(ModelViewSet):
    queryset = DoctorSpecialistNotification.objects.all()
    serializer_class = DoctorSpecialistNotificationSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        specialist_id = self.request.query_params.get('specialist_id')
        read_status = self.request.query_params.get('read')
        if specialist_id and read_status:
            queryset = queryset.filter(recipient_id=specialist_id, read=read_status)
        elif specialist_id:
            queryset = queryset.filter(recipient_id=specialist_id)
        elif read_status:
            queryset = queryset.filter(read=read_status)
        return queryset
class DoctorPatientMessageNotificationViewSet(ModelViewSet):
    queryset = DoctorPatientMessageNotification.objects.all()
    serializer_class = DoctorPatientMessageNotificationSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        patient_id = self.request.query_params.get('patient_id')
        read_status = self.request.query_params.get('read')
        if patient_id and read_status:
            queryset = queryset.filter(recipient_id=patient_id, read=read_status)
        elif patient_id:
            queryset = queryset.filter(recipient_id=patient_id)
        elif read_status:
            queryset = queryset.filter(read=read_status)
        return queryset
class SpecialistDoctorNotificationViewSet(ModelViewSet):
    queryset = SpecialistDoctorNotification.objects.all()
    serializer_class = SpecialistDoctorNotificationSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        doctor_id = self.request.query_params.get('doctor_id')
        if doctor_id:
            queryset = queryset.filter(recipient_id=doctor_id)
        return queryset



class CustomerViewSet(CreateModelMixin,RetrieveModelMixin,UpdateModelMixin,GenericViewSet):
    queryset=Customer.objects.all()
    serializer_class=CustomerSerializer
    @action(detail=False, methods=['GET'])
    def doctors(self, request):
        doctors = Customer.objects.filter(role='doctor')
        serializer = CustomerSerializer(doctors, many=True)
        return Response(serializer.data)
    @action(detail=False, methods=['GET'])
    def specialists(self, request):
        specialists = Customer.objects.filter(role='specialist')
        serializer = CustomerSerializer(specialists, many=True)
        return Response(serializer.data)
    @action(detail=False, methods=['GET'])
    def patients(self, request):
        patients = Customer.objects.filter(role='patient')
        serializer = CustomerSerializer(patients, many=True)
        return Response(serializer.data)
    @action(detail=False, methods=['GET'])
    def radiologists(self, request):
        radiologists = Customer.objects.filter(role='radiologist')
        serializer = CustomerSerializer(radiologists, many=True)
        return Response(serializer.data)
    @action(detail=False,methods=['GET','PUT'])
    def me(self,request):
        # return self.retrieve(request)
        (customer,created)=Customer.objects.get_or_create(user_id=request.user.id)
        if request.method=='GET':
            serializer=CustomerSerializer(customer)
            return Response(serializer.data)   
        elif request.method=='PUT':
            serializer=CustomerSerializer(customer,data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data) 


















class PatientInfoViewSet(ModelViewSet):
    queryset = Recomendation.objects.all()
    serializer_class = RecomendationSerializer
    @action(detail=False, methods=['GET', 'PUT'])
    def me(self, request):
        # Retrieve all recommendations for the current user
        recommendations = Recomendation.objects.filter(user_id=request.user.id)
        if request.method == 'GET':
            # Serialize and return all recommendations
            serializer = RecomendationSerializer(recommendations, many=True)
            return Response(serializer.data)
        elif request.method == 'PUT':
            # Handle PUT request, assuming updating the first recommendation
            if recommendations.exists():
                recommendation = recommendations.first()
                serializer = RecomendationSerializer(recommendation, data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data)
            else:
                return Response({"error": "There is no patient info for this user"}, status=status.HTTP_404_NOT_FOUND)






class MedicalRecordViewSet(ModelViewSet):
    serializer_class = MedicalRecordSerializer
    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        if patient_id:
            return MedicalRecord.objects.filter(patient__id=patient_id)
        return MedicalRecord.objects.none()  # Return no records if no patient_id is provided
  
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    def put(self, request, *args, **kwargs):
        patient_id = request.query_params.get('patient_id')
        if not patient_id:
            return Response({"detail": "Patient ID not provided."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            medical_record = MedicalRecord.objects.get(patient__id=patient_id)
        except MedicalRecord.DoesNotExist:
            return Response({"detail": "Medical record not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(medical_record, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class GetPatientBasedOnMedicalRecordViewSet(ModelViewSet):
    serializer_class = MedicalRecordSerializer
    def get_queryset(self):
        doctor_id = self.request.query_params.get('doctor_id')
        if doctor_id:
            return MedicalRecord.objects.filter(doctor_id=doctor_id)
        return MedicalRecord.objects.none()






class DoctorSpecialistRequestViewSet(ModelViewSet):
    queryset = DoctorSpecialistRequest.objects.all()
    serializer_class=DoctorSpecialistRequestSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctorrequest = serializer.save()
        # Retrieve patient and doctor objects
        doctor_id = serializer.validated_data['doctor'].id
        specialist_id = serializer.validated_data['specialist'].id
        User = get_user_model()
        doctor = User.objects.get(id=doctor_id)
        specialist = User.objects.get(id=specialist_id)
        # Construct message with patient's first name and last name
        doctor_name = f"{doctor.first_name} {doctor.last_name}"
        message = f"New Request Message From Doctor (ID: {doctorrequest.id}) Name {doctor_name}. Please review."
        DoctorSpecialistNotification.objects.create(recipient=specialist, doctor_id=doctor_id, message=message)
        
        sender_email = "fetamasr@gmail.com"
        recipient_email = specialist.email
        try:
            send_email_with_retry(
                'New Message Notification',
                message,
                sender_email,
                [recipient_email],
                retries=3,
                delay=5,
            )
        except Exception as e:
            logger.error(f"Failed to send email notification after multiple attempts: {e}")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
class DoctorPatientMessageViewSet(ModelViewSet):
    queryset = DoctorPatientMessage.objects.all()
    serializer_class=DoctorPatientMessageSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctormessage = serializer.save()
        # Retrieve patient and doctor objects
        doctor_id = serializer.validated_data['doctor'].id
        patient_id = serializer.validated_data['patient'].id
        User = get_user_model()
        doctor = User.objects.get(id=doctor_id)
        patient = User.objects.get(id=patient_id)
        # Construct message with patient's first name and last name
        doctor_name = f"{doctor.first_name} {doctor.last_name}"
        message = f"New  Message From Doctor (ID: {doctormessage.id}) Name {doctor_name}. Please review."
        DoctorPatientMessageNotification.objects.create(recipient=patient, doctor_id=doctor_id, message=message)
        sender_email = "fetamasr@gmail.com"
        recipient_email = patient.email
        try:
            send_email_with_retry(
                'New Message Notification From Doctor',
                message,
                sender_email,
                [recipient_email],
                retries=3,
                delay=5,
            )
        except Exception as e:
            logger.error(f"Failed to send email notification after multiple attempts: {e}")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
class SpecialistDoctorResponseViewSet(ModelViewSet):
    queryset = SpecialistDoctorResponse.objects.all()
    serializer_class=SpecialistDoctorResponseSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        specialistresponse = serializer.save()
        doctor_id = serializer.validated_data['doctor'].id
        specialist_id = serializer.validated_data['specialist'].id
        User = get_user_model()
        doctor = User.objects.get(id=doctor_id)
        specialist = User.objects.get(id=specialist_id)
        specialist_name = f"{specialist.first_name} {specialist.last_name}"
        message = f"New Response Message From Specialist (ID: {specialistresponse.id}) Name {specialist_name}. Please review."
        SpecialistDoctorNotification.objects.create(recipient=doctor, specialist_id=specialist_id, message=message)
        sender_email = "fetamasr@gmail.com"
        recipient_email = doctor.email
        print(doctor.email)
        try:
            send_email_with_retry(
                'New Message Notification From Specialist',
                message,
                sender_email,
                [recipient_email],
                retries=3,
                delay=5,
            )
        except Exception as e:
            logger.error(f"Failed to send email notification after multiple attempts: {e}")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class SpecialistDoctorRecommendationViewSet(ModelViewSet):
    queryset = SpecialistDoctorRecommendation.objects.all()
    serializer_class=SpecialistDoctorRecommendationSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        specialistrecommendation = serializer.save()
        doctor_id = serializer.validated_data['doctor'].id
        specialist_id = serializer.validated_data['specialist'].id
        User = get_user_model()
        doctor = User.objects.get(id=doctor_id)
        specialist = User.objects.get(id=specialist_id)
        specialist_name = f"{specialist.first_name} {specialist.last_name}"
        message = f"New Recommendation Message From Specialist (ID: {specialistrecommendation.id}) Name {specialist_name}. Please review."
        SpecialistDoctorNotification.objects.create(recipient=doctor, specialist_id=specialist_id, message=message)
        sender_email = "fetamasr@gmail.com"
        recipient_email = doctor.email
        print(doctor.email)
        try:
            send_email_with_retry(
                'New Message Notification From Specialist',
                message,
                sender_email,
                [recipient_email],
                retries=3,
                delay=5,
            )
        except Exception as e:
            logger.error(f"Failed to send email notification after multiple attempts: {e}")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)