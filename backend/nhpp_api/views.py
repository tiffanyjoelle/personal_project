from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import PermitSerializer, MaterialSerializer, AuthorizedUserSerializer
from .models import Permit, Material


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

# class MaterialsView(APIView):

#     def get(self, request, office_code):
#         permit = Permit.objects.get(office_code=office_code)
#         data = Material.objects.filter(permit = permit)
#         serializer = MaterialSerializer(data)
#         return Response({"result": serializer.data})

    # def put(self, request, pk):
    #     saved_wine = get_object_or_404(Wine.objects.all(), pk=pk)
    #     data = request.data
    #     serializer = FacilityDemographicSerializer(instance=saved_wine, data=data, partial=True) #partial means not all fields are required 
    #     #The .is_valid() method takes an optional raise_exception flag that will cause it to raise a serializers.ValidationError exception if there are validation errors.
    #     if serializer.is_valid(raise_exception=True):#
    #         saved_wine = serializer.save()
    #     return Response({"result": f"{saved_wine.wine_name} updated"})

    # def delete(self, request, pk):
    #     wine = get_object_or_404(Wine.objects.all(), pk=pk)
    #     wine.delete()
    #     return Response({"result": f"Wine id {pk} deleted"},status=204)