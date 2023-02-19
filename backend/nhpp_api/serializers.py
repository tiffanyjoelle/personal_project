from rest_framework import serializers
from .models import ProgramCode, InspectionPriority, Source, Form, AuthorizedUse, Material, AuMaterialsUse, PermitProgram, RSO, AuthorizedUser, Permit, FacilityDemographic

class ProgramCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramCode
        fields = '__all__'

class InspectionPrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = InspectionPriority
        fields = '__all__'

class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = '__all__'

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = '__all__'

class AuthorizedUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorizedUse
        fields = '__all__'

class MaterialSerializer(serializers.ModelSerializer):
    source = SourceSerializer(many=True)
    form = FormSerializer(many=True)
    authorized_use = AuthorizedUseSerializer(many=True)

    class Meta:
        model = Material
        fields = '__all__'

class AuMaterialsUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuMaterialsUse
        fields = '__all__'

class PermitProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermitProgram
        fields = '__all__'

class RSONameSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSO
        fields = ['id', 'first_name', 'middle_name', 'last_name']

class RSOContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSO
        fields = ['email', 'phone', 'alt_phone']

class RSOConsultingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSO
        fields = ['consulting_firm']

class RSOSerializer(serializers.ModelSerializer):
    name = RSONameSerializer()
    contact = RSOContactSerializer()
    consulting = RSOConsultingSerializer()

    class Meta:
        model = RSO
        fields = ['name', 'credentials', 'contact', 'consulting', 'notes']

class AuthorizedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorizedUser
        fields = '__all__'

class PermitSerializer(serializers.ModelSerializer):
    program_codes = ProgramCodeSerializer(many=True)
    inspection_priority = InspectionPrioritySerializer()
    material = MaterialSerializer(many=True)
    permit_program = PermitProgramSerializer(many=True)
    primary_rso = RSONameSerializer()
    alt_rso = RSONameSerializer()
    authorized_user = AuthorizedUserSerializer(many=True)
    facility = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Permit
        fields = '__all__'

class FacilityDemographicSerializer(serializers.ModelSerializer):
    permit = PermitSerializer(read_only=True)

    class Meta:
        model = FacilityDemographic
        fields = '__all__'