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