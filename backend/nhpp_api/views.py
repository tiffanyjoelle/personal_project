from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import requests
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
import xml.etree.ElementTree as ET
import os


class GetPermitView(APIView):

    def get(self, request, office_code=None):
        if office_code:  # can i add my tp api call here too
            data = Permit.objects.get(office_code=office_code)
            serializer = PermitSerializer(data)

        else:
            data = Permit.objects.all().order_by('city')
            serializer = PermitSerializer(data, many=True)
        return Response({"result": serializer.data})

class PostPermitView(APIView):

    def get(self, request, office_code=None):
        if office_code:  # can i add my tp api call here too
            data = Permit.objects.get(office_code=office_code)
            serializer = PermitPostSerializer(data)
        else:
            data = Permit.objects.all()
            serializer = PermitPostSerializer(data, many=True)
        return Response({"result": serializer.data})

    # can make post request w PK for RSO info to select from existing list
    def post(self, request):
        permit = request.data
        serializer = PermitPostSerializer(data=permit)
        if serializer.is_valid(raise_exception=True):
            permit_saved = serializer.save()
        return Response({"result": f"Permit {permit_saved.office_code} created"})

    # make put that will take office code and allow edits to RSO assigned
    def put(self, request, office_code):
        saved_permit = get_object_or_404(Permit.objects.all(), office_code=office_code)
        data = request.data
        serializer = PermitPostSerializer(instance=saved_permit, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            saved_permit = serializer.save()
        return Response({"result": f"Permit {saved_permit.office_code} updated"})

    def delete(self, request, office_code):
        permit = get_object_or_404(Permit.objects.all(), office_code=office_code)
        permit.delete()
        return Response({"result": f"Permit deleted for Facility {office_code}"},status=204)

class RSOView(APIView):

    def get(self, request, pk=None):
        if pk: 
            data = RSO.objects.get(pk=pk)
            serializer = RSOSerializer(data)
            return Response({"result": serializer.data})
        else:
            data = RSO.objects.all()
            serializer = RSOSerializer(data, many=True)
            return Response({"result": serializer.data})

    def post(self, request):
        rso = request.data
        serializer = RSOSerializer(data=rso)
        if serializer.is_valid(raise_exception=True):
            rso_saved = serializer.save()
        return Response({"id": {rso_saved.id}})

    def put(self, request, pk):
        saved_rso = get_object_or_404(RSO.objects.all(), pk=pk)
        data = request.data
        serializer = RSOSerializer(instance=saved_rso, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            saved_rso = serializer.save()
        return Response({"result": f"RSO {saved_rso.first_name}"})

    def delete(self, request, pk):
        rso = get_object_or_404(RSO.objects.all(), pk=pk)
        rso.delete()
        return Response({"result": f"RSO {rso.first_name} deleted"},status=204)

class ProgramCodesView(APIView):
    def get(self, request):
        data = ProgramCode.objects.all().order_by('code')
        serializer = ProgramCodeSerializer(data, many=True)
        return Response({"result": serializer.data})

class MaterialView(APIView):
    def get(self, request):
        data = Material.objects.all().order_by('source')
        serializer = MaterialSerializer(data, many=True)
        return Response({"result": serializer.data})
    
    def post(self, request):
        material = request.data
        serializer = MaterialSerializer(data=material)
        if serializer.is_valid(raise_exception=True):
            material_saved = serializer.save()
        return Response({"result": f"{material_saved.source} created"})

class InspectionPriorityView(APIView):
    def get(self, request):
        data = InspectionPriority.objects.all()
        serializer = InspectionPrioritySerializer(data, many=True)
        return Response({"result": serializer.data})

class AuthorizedUseView(APIView):
    def get(self, request):
        data = AuthorizedUse.objects.all()
        serializer = AuthorizedUseSerializer(data, many=True)
        return Response({"result": serializer.data})
    
    def post(self, request):
        use = request.data
        serializer = AuthorizedUseSerializer(data=use)
        if serializer.is_valid(raise_exception=True):
            use_saved = serializer.save()
        return Response({"result": f"{use_saved.use} created"})

class AuthorizedUserView(APIView):
    def get(self, request):
        data = AuthorizedUser.objects.all().order_by('full_name')
        serializer = AuthorizedUserSerializer(data, many=True)
        return Response({"result": serializer.data})

    def post(self, request):
        au = request.data
        serializer = AuthorizedUserSerializer(data=au)
        if serializer.is_valid(raise_exception=True):
            au_saved = serializer.save()
        return Response({"result": f"{au_saved.full_name} created"})
        
class PermitProgramView(APIView):
    def get(self, request):
        data = PermitProgram.objects.all().order_by('title')
        serializer = PermitProgramSerializer(data, many=True)
        return Response({"result": serializer.data})
    
    def post(self, request):
        program = request.data
        serializer = PermitProgramSerializer(data=program)
        if serializer.is_valid(raise_exception=True):
            program_saved = serializer.save()
        return Response({"result": f"{program_saved.title} created"})

class FacilityInfoView(APIView):
    def get(self, request, office_code):
        url = f'https://sandbox-api.va.gov/services/va_facilities/v0/facilities/vha_{office_code}'
        headers = {
            "apikey": os.getenv("VA_API_KEY")
        }
        response = requests.get(url, headers=headers)
        data = response.json()["data"] if response.status_code == 200 else None
        return JsonResponse({"data": data})
    
class NRCArticlesView(APIView):
    def get(self, request):
        url = "https://adams.nrc.gov/wba/services/search/advanced/nrc?q=(mode%3Asections,sections%3A(filters%3A(public-library%3A!t),single_content_search%3A'Veteran%2BAffairs'))&tab=content-search-pars&s=PublishDatePARS&so=DESC&max_results=10"

        response = requests.get(url)
        xml_data = response.content
        # print(xml_data)
        
        # Parse the XML data into a tree structure
        root = ET.fromstring(xml_data)
    
        # Get all document title elements and their corresponding URLs
        document_info = [{'title': result.find('DocumentTitle').text, 'url': result.find('URI').text} for result in root.findall('.//result')]

        # Do something with the document titles and URLs (e.g. return them in a JSON response)
        return JsonResponse({'documents': document_info})