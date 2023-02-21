from rest_framework import serializers
from .models import *

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

class AuthorizedUserUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorizedUserUse
        fields = '__all__'

class AuthorizedUserSerializer(serializers.ModelSerializer):
    material_and_use = AuthorizedUserUseSerializer(many=True)

    class Meta:
        model = AuthorizedUser
        fields = '__all__'

class MaterialSerializer(serializers.ModelSerializer):
    source = SourceSerializer()
    authorized_use = AuthorizedUseSerializer()
    form = FormSerializer()

    class Meta:
        model = Material
        fields = '__all__'

class PermitProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermitProgram
        fields = '__all__'

class ProgramCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramCode
        fields = '__all__'

class InspectionPrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = InspectionPriority
        fields = '__all__'

class RSOSerializer(serializers.ModelSerializer):
    middle_name = serializers.CharField(required=False)
    credentials = serializers.CharField(required=False)
    alt_phone = serializers.CharField(required=False)
    consulting_firm = serializers.CharField(required=False)
    notes = serializers.CharField(required=False)

    class Meta:
        model = RSO
        fields = '__all__'

# rso input for serializer can be dict or int now
class PrimaryRSOField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError:
            serializer = RSOSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            rso = serializer.save()
            return rso.pk

# create custom inspection priority/program_codes/permit_program for permit to be like rso input?? edit each under individual serializer

class PermitSerializer(serializers.ModelSerializer):
    program_codes = ProgramCodeSerializer(many=True)
    inspection_priority = InspectionPrioritySerializer()
    material = MaterialSerializer(many=True, required=False)
    permit_program = PermitProgramSerializer(many=True, required=False)
    primary_rso = PrimaryRSOField(queryset=RSO.objects.all(), required=False)
    # alt_rso = RSOSerializer(required=False) remove alt rso
    authorized_user = AuthorizedUserSerializer(many=True, required=False)
    docket_num = serializers.CharField(allow_blank=True, required=False, default='N/A')

    class Meta:
        model = Permit
        fields = '__all__'

    def create(self, validated_data):
        materials_data = validated_data.pop('material')
        # authorized_users_data = validated_data.pop('authorized_user', None)
        program_code_data = validated_data.pop('program_codes')
        permit_programs_data = validated_data.pop('permit_program')
        inspection_priority_data = validated_data.pop('inspection_priority')
        primary_rso_data = validated_data.pop('primary_rso', None)
        
        if primary_rso_data:
            if type(primary_rso_data) == int:
                rso = RSO.objects.get(pk=primary_rso_data)
            else:
                rso = primary_rso_data
            validated_data['primary_rso'] = rso

        priority = InspectionPriority.objects.create(**inspection_priority_data)
        permit = Permit.objects.create(**validated_data)

        for material_data in materials_data:
            source_data = material_data.pop('source')
            authorized_use_data = material_data.pop('authorized_use')
            form_data = material_data.pop('form')

            source_serializer = SourceSerializer(data=source_data)
            source_serializer.is_valid(raise_exception=True)
            source = source_serializer.save()

            authorized_use_serializer = AuthorizedUseSerializer(data=authorized_use_data)
            authorized_use_serializer.is_valid(raise_exception=True)
            authorized_use = authorized_use_serializer.save()

            form_serializer = FormSerializer(data=form_data)
            form_serializer.is_valid(raise_exception=True)
            form = form_serializer.save()

            material = Material.objects.create(source=source, authorized_use=authorized_use, form=form, **material_data)
            permit.material.set([material])


        # if authorized_users_data:
        #     for authorized_user in authorized_users_data:
        #         au = AuthorizedUser.objects.create(**authorized_user)
        #         permit.authorized_user.set([au])

        # if having trouble w the double nested, perhaps make single nested and be ok w data redundancy for now

        for permit_program in permit_programs_data:
            program = PermitProgram.objects.create(**permit_program)
            permit.permit_program.set([program])

        for program_code in program_code_data:
            code = ProgramCode.objects.create(**program_code)
            permit.program_codes.set([code])

        return permit