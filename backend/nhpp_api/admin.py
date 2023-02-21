from django.contrib import admin
from .models import * 

admin.site.register(RSO)
admin.site.register(Source)
admin.site.register(Material)
admin.site.register(Form)
admin.site.register(AuthorizedUse)
admin.site.register(AuthorizedUser)
admin.site.register(AuthorizedUserUse)
admin.site.register(PermitProgram)
admin.site.register(ProgramCode)
admin.site.register(InspectionPriority)
admin.site.register(Permit)