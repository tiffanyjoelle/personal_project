from django.db import models

class ProgramCode(models.Model):
  program_code = models.IntegerField()
  description = models.CharField(max_length=255)

  def __str__(self):
    return f'{self.program_code}'

class InspectionPriority(models.Model):
  priority_num = models.IntegerField()

  def __str__(self):
    return f'{self.priority_num}'

class Source(models.Model):
  source = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.source}'

class Form(models.Model):
  form = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.form}'

class AuthorizedUse(models.Model):
  description = models.CharField(max_length=255)

  def __str__(self):
    return f'{self.description}'

class Material(models.Model):
  source = models.ManyToManyField(Source)
  form = models.ManyToManyField(Form)
  amount_of_source = models.CharField(max_length=100)
  authorized_use = models.ManyToManyField(AuthorizedUse)

  def __str__(self):
    return f'{self.id}: {self.source.get()}, {self.form.get()}, {self.amount_of_source}'

class AuMaterialsUse(models.Model):
  description = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.description}'

class PermitProgram(models.Model):
  title = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.title}'

class RSO(models.Model):
  first_name = models.CharField(max_length=50)
  middle_name = models.CharField(max_length=50, blank=True, null=True)
  last_name = models.CharField(max_length=50)
  credentials = models.CharField(max_length=100, blank=True, null=True)
  email = models.EmailField()
  phone = models.CharField(max_length=30, default='000-000-0000')
  alt_phone = models.CharField(max_length=30, blank=True, null=True)
  consulting_firm = models.CharField(max_length=100, blank=True, null=True)
  notes = models.TextField(blank=True, null=True)

  def __str__(self):
    return f'{self.last_name}, {self.first_name}'

class AuthorizedUser(models.Model):
  full_name = models.CharField(max_length=50)
  credentials = models.CharField(max_length=50, null=True, blank=True)
  material_and_use = models.ManyToManyField(AuMaterialsUse)

  def __str__(self):
    return f'{self.full_name}'

# everything will relate to license
class Permit(models.Model):
  permit_num = models.CharField(max_length=11)
  docket_num = models.CharField(max_length=9, null=True, blank=True)
  exp_date = models.DateField()
  program_codes = models.ManyToManyField(ProgramCode)
  inspection_priority = models.ForeignKey(InspectionPriority, models.SET_NULL, null=True)
  material = models.ManyToManyField(Material)
  permit_program = models.ManyToManyField(PermitProgram, blank=True)
  primary_rso = models.ForeignKey(RSO, models.SET_NULL, related_name='permit_rso', blank=True, null=True)
  alt_rso = models.ForeignKey(RSO, models.SET_NULL, related_name='permit_alt_rso', blank=True, null=True)
  authorized_user = models.ManyToManyField(AuthorizedUser, blank=True)

  def __str__(self):
    return f'{self.permit_num}'

class FacilityDemographic(models.Model):
  office_code = models.CharField(max_length=10)
  city = models.CharField(max_length=40)
  state_abbrev = models.CharField(max_length=2)
  permit = models.ForeignKey(Permit, models.SET_NULL, related_name='facility', blank=True, null=True)

  def __str__(self):
    return f'{self.office_code}: {self.city}, {self.state_abbrev}'