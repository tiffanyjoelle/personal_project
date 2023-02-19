from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import FacilityDemographicSerializer
from .models import FacilityDemographic


class FacilityView(APIView):

    def get(self, request, office_code=None):
        if office_code:  
            data = FacilityDemographic.objects.get(office_code=office_code)
            serializer = FacilityDemographicSerializer(data)
        else:
            data = FacilityDemographic.objects.all()
            serializer = FacilityDemographicSerializer(data, many=True)
        return Response({"result": serializer.data})