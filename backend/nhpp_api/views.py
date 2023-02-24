from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *


class GetPermitView(APIView):

    def get(self, request, office_code=None):
        if office_code:  # can i add my tp api call here too
            data = Permit.objects.get(office_code=office_code)
            serializer = PermitSerializer(data)

        else:
            data = Permit.objects.all()
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

# class MaterialView(APIView):

#     def get(self, request, office_code, pk=None): 
#         #if pk=None: 
#         data = Material.objects.filter(permit__office_code = office_code)
#         serializer = MaterialSerializer(data, many=True)
#         return Response({"result": serializer.data})

#         #else: pull specific use

#     def put(self, request, office_code, pk):
#         saved_materials = (Material.objects.filter(permit__office_code = office_code))
#         data = request.data
#         serializer = MaterialSerializer(instance=saved_materials, many=True, data=data, partial=True)
#         if serializer.is_valid(raise_exception=True):
#             saved_materials = serializer.save()
#         return Response({"result": {serializer.data}})

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

class AuthorizedUserView(APIView):
    def get(self, request):
        data = AuthorizedUser.objects.all().order_by('full_name')
        serializer = AuthorizedUserSerializer(data, many=True)
        return Response({"result": serializer.data})

class PermitProgramView(APIView):
    def get(self, request):
        data = PermitProgram.objects.all().order_by('title')
        serializer = PermitProgramSerializer(data, many=True)
        return Response({"result": serializer.data})