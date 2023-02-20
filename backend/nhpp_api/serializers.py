from rest_framework import serializers, fields
from .models import Source, AuthorizedUse, Material, PermitProgram, RSO, AuthorizedUser, Permit

class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = '__all__'

class AuthorizedUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorizedUse
        fields = '__all__'

class MaterialSerializer(serializers.ModelSerializer):
    form = serializers.ChoiceField(choices=Material.FORM_CHOICES)
    class Meta:
        model = Material
        fields = '__all__'

class PermitProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermitProgram
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

class AuthorizedUserSerializer(serializers.ModelSerializer):
    material_and_use = serializers.MultipleChoiceField(choices=AuthorizedUser.MATERIAL_AND_USE_CHOICES)

    class Meta:
        model = AuthorizedUser
        fields = '__all__'

class PermitSerializer(serializers.ModelSerializer):
    program_codes = serializers.MultipleChoiceField(choices=Permit.PROGRAM_CODE_CHOICES)
    inspection_priority = serializers.ChoiceField(choices=Permit.INSPECTION_PRIORITY_CHOICES)
    material = MaterialSerializer(many=True, required=False)
    permit_program = PermitProgramSerializer(many=True, required=False)
    primary_rso = serializers.PrimaryKeyRelatedField(queryset=RSO.objects.all())
    alt_rso = RSOSerializer(required=False)
    authorized_user = AuthorizedUserSerializer(many=True, required=False)
    docket_num = serializers.CharField(allow_blank=True, required=False, default='N/A')

    class Meta:
        model = Permit
        fields = '__all__'

    def create(self, validated_data):
        materials_data = validated_data.pop('material')
        authorized_users_data = validated_data.pop('authorized_user')
        permit_programs_data = validated_data.pop('permit_program')
        primary_rso = validated_data.pop('primary_rso')
        permit = Permit.objects.create(primary_rso=primary_rso, **validated_data)

        for material in materials_data:
            material = Material.objects.create(**material)
            permit.material.set([material])
        
        for authorized_user in authorized_users_data:
            au = AuthorizedUser.objects.create(**authorized_user)
            permit.authorized_user.set([au])
        
        for permit_program in permit_programs_data:
            program = PermitProgram.objects.create(**permit_program)
            permit.permit_program.set([program])

        return permit