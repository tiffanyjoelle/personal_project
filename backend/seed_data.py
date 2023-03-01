from nhpp_api.models import Material, PermitProgram, ProgramCode, InspectionPriority, RSO, Permit

# Create some program codes
code1 = ProgramCode.objects.create(code=2110)
code2 = ProgramCode.objects.create(code=2120)
code3 = ProgramCode.objects.create(code=2121)
code4 = ProgramCode.objects.create(code=2230)
code5 = ProgramCode.objects.create(code=2240)
code6 = ProgramCode.objects.create(code=3510)
code7 = ProgramCode.objects.create(code=3610)
code8 = ProgramCode.objects.create(code=3620)

# Create some inspection priorities
priority1 = InspectionPriority.objects.create(priority_num=2)
priority2 = InspectionPriority.objects.create(priority_num=3)
priority3 = InspectionPriority.objects.create(priority_num=5)

# Create some RSOs
rso1 = RSO.objects.create(first_name='Alice', last_name='Smith', email='alice.smith@example.com', phone='123-456-7890')
rso2 = RSO.objects.create(first_name='Bob', last_name='Jones', email='bob.jones@example.com', phone='987-654-3210', consulting_firm='LBT Radiation Physics Consulting')

# Create a permit
permit1 = Permit.objects.create(office_code=598, city='Little Rock', state_abbrev='AR', permit_num='11-11111-11', exp_date='2033-01-31', docket_num='111-11111')
permit1.program_codes.add(code1)
permit1.inspection_priority = priority1
permit1.material.add(material1)
permit1.authorized_use.add(use1)
permit1.authorized_user.add(user1)
permit1.permit_program.add(program1)
permit1.primary_rso = rso1
permit1.save()