from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import PermitSerializer, RSOSerializer, MaterialSerializer
from .models import Permit, RSO, Material


class PermitView(APIView):

    def get(self, request, office_code=None):
        if office_code:  
            data = Permit.objects.get(office_code=office_code)
            serializer = PermitSerializer(data)
        else:
            data = Permit.objects.all()
            serializer = PermitSerializer(data, many=True)
        return Response({"result": serializer.data})

    # can make post request w PK for RSO info to select from existing list
    def post(self, request):
        permit = request.data
        serializer = PermitSerializer(data=permit)
        if serializer.is_valid(raise_exception=True):
            permit_saved = serializer.save()
        return Response({"result": f"Permit {permit_saved.office_code}"})

    # make put that will take office code and allow edits to RSO assigned
    def put(self, request, office_code):
        pass

class RSOView(APIView):

    def get(self, request, pk):  
        data = RSO.objects.get(pk=pk)
        serializer = RSOSerializer(data)
        return Response({"result": serializer.data})

    # was thinking of adding new RSO this way, but can do that on facility page, just need a put/delete? maybe still add it for multiple options to post
    def post(self, request, office_code, pk):
        pass

class MaterialView(APIView):

    def get(self, request, office_code):  
        data = Material.objects.filter(permit__office_code = office_code)
        serializer = MaterialSerializer(data, many=True)
        return Response({"result": serializer.data})