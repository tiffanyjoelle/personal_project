from rest_framework import serializers
from .models import * 
from django.contrib.auth.models import User

class AuthorizedUserField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError:
            serializer = AuthorizedUserSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            authorized_user = serializer.save()
            return authorized_user.pk

class AuthorizedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorizedUser
        fields = '__all__'

class AuthorizedUseField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError:
            serializer = AuthorizedUseSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            authorized_use = serializer.save()
            return authorized_use.pk

class AuthorizedUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorizedUse
        fields = '__all__'

class MaterialField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError:
            serializer = MaterialSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            material = serializer.save()
            return material.pk

class MaterialSerializer(serializers.ModelSerializer):
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
    middle_name = serializers.CharField(required=False, allow_blank=True)
    credentials = serializers.CharField(required=False, allow_blank=True)
    alt_phone = serializers.CharField(required=False, allow_blank=True)
    consulting_firm = serializers.CharField(required=False, allow_blank=True)
    notes = serializers.CharField(required=False, allow_blank=True)

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

class InspectionPriorityField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError:
            serializer = InspectionPrioritySerializer(data=data)
            serializer.is_valid(raise_exception=True)
            priority = serializer.save()
            return priority.pk

class ProgramCodeField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError:
            serializer = ProgramCodeSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            program_code = serializer.save()
            return program_code.pk

class PermitProgramField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError:
            serializer = PermitProgramSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            permit_program = serializer.save()
            return permit_program.pk

class PermitSerializer(serializers.ModelSerializer):
    program_codes = ProgramCodeSerializer(many=True)
    inspection_priority = InspectionPrioritySerializer()
    material = MaterialSerializer(many=True, required=False)
    permit_program = PermitProgramSerializer(many=True, required=False)
    primary_rso = RSOSerializer()
    authorized_use = AuthorizedUseSerializer(many=True, required=False)
    authorized_user = AuthorizedUserSerializer(many=True, required=False)
    docket_num = serializers.CharField(allow_blank=True, required=False, default='N/A')

    class Meta:
        model = Permit
        fields = '__all__'

class PermitPostSerializer(serializers.ModelSerializer):
    program_codes = ProgramCodeField(queryset=ProgramCode.objects.all(), many=True)
    inspection_priority = InspectionPriorityField(queryset=InspectionPriority.objects.all(), required=False)
    material = MaterialField(queryset=Material.objects.all(), many=True, required=False)
    authorized_use = AuthorizedUseField(queryset=AuthorizedUse.objects.all(), many=True, required=False)
    permit_program = PermitProgramField(queryset=PermitProgram.objects.all(), many=True, required=False)
    primary_rso = PrimaryRSOField(queryset=RSO.objects.all(), required=False)
    authorized_user = AuthorizedUserField(queryset=AuthorizedUser.objects.all(), many=True, required=False)
    docket_num = serializers.CharField(allow_blank=True, required=False, default='N/A')

    class Meta:
        model = Permit
        fields = '__all__'

    def check_and_assign_permit_data(self, data, object, validated_data, permit_field):
        if data:
            if type(data) == int:
                checked_data = object.objects.get(pk=data)
            else:
                checked_data = data
            validated_data[permit_field] = checked_data

    def check_nested_data(self, data, object):
        if type(data) == int:
            field_name = object.objects.get(pk=data)
        else:
            field_name = data
        return field_name

    def create(self, validated_data):
        materials_data = validated_data.pop('material', None)
        authorized_use_data = validated_data.pop('authorized_use', None)
        authorized_user_data = validated_data.pop('authorized_user', None)
        program_code_data = validated_data.pop('program_codes', None)
        permit_programs_data = validated_data.pop('permit_program', None)
        inspection_priority_data = validated_data.pop('inspection_priority', None)
        primary_rso_data = validated_data.pop('primary_rso', None)
        
        self.check_and_assign_permit_data(primary_rso_data, RSO, validated_data, 'primary_rso')
        self.check_and_assign_permit_data(inspection_priority_data, InspectionPriority, validated_data, 'inspection_priority')
        permit = Permit.objects.create(**validated_data)

        materials = []
        for material in materials_data:
            materials.append(self.check_nested_data(material, Material))
        permit.material.set(materials)

        authorized_uses = []
        for use in authorized_use_data:
            authorized_uses.append(self.check_nested_data(use, AuthorizedUse))
        permit.authorized_use.set(authorized_uses)

        authorized_users = []
        for user in authorized_user_data:
            authorized_users.append(self.check_nested_data(user, AuthorizedUser))
        permit.authorized_user.set(authorized_users)
        
        programs = []
        for permit_program in permit_programs_data:
            programs.append(self.check_nested_data(permit_program, PermitProgram))
        permit.permit_program.set(programs)

        codes = []
        for program_code in program_code_data:
            codes.append(self.check_nested_data(program_code, ProgramCode))
        permit.program_codes.set(codes)

        return permit

    def update(self, permit, validated_data):
        materials_data = validated_data.pop('material', None)
        authorized_use_data = validated_data.pop('authorized_use', None)
        authorized_user_data = validated_data.pop('authorized_user', None)
        program_code_data = validated_data.pop('program_codes', None)
        permit_programs_data = validated_data.pop('permit_program', None)
        inspection_priority_data = validated_data.pop('inspection_priority', None)
        primary_rso_data = validated_data.pop('primary_rso', None)

        self.check_and_assign_permit_data(primary_rso_data, RSO, validated_data, 'primary_rso')
        self.check_and_assign_permit_data(inspection_priority_data, InspectionPriority, validated_data, 'inspection_priority')

        for key, value in validated_data.items():
            setattr(permit, key, value)
        permit.save()

        if materials_data != None:
            materials = []
            for material in materials_data:
                materials.append(self.check_nested_data(material, Material))
            permit.material.set(materials)

        if authorized_user_data != None:
            authorized_uses = []
            for use in authorized_use_data:
                authorized_uses.append(self.check_nested_data(use, AuthorizedUse))
            permit.authorized_use.set(authorized_uses)

        if authorized_user_data != None:
            authorized_users = []
            for user in authorized_user_data:
                authorized_users.append(self.check_nested_data(user, AuthorizedUser))
            permit.authorized_user.set(authorized_users)
        
        if permit_programs_data != None:
            programs = []
            for permit_program in permit_programs_data:
                programs.append(self.check_nested_data(permit_program, PermitProgram))
            permit.permit_program.set(programs)

        if program_code_data != None:
            codes = []
            for program_code in program_code_data:
                codes.append(self.check_nested_data(program_code, ProgramCode))
            permit.program_codes.set(codes)

        return permit


