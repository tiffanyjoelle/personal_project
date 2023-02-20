from django.db import models
from multiselectfield import MultiSelectField

class Source(models.Model):
  source = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.source}'

class AuthorizedUse(models.Model):
  description = models.CharField(max_length=255)

  def __str__(self):
    return f'{self.description}'

class Material(models.Model):
  
  ANY = "ANY"
  SS = "SEALED SOURCES"

  FORM_CHOICES = (
    (ANY,"Any"),
    (SS, "Sealed Sources"),
  )

  source = models.ForeignKey(Source, on_delete=models.CASCADE)
  form = models.CharField(max_length=20, choices=FORM_CHOICES, default=ANY)
  amount_of_source = models.CharField(max_length=100)
  authorized_use = models.ForeignKey(AuthorizedUse, on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.id}: {self.source}'

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

  MATERIAL_AND_USE_CHOICES = (

    ('100', '10 CFR 35.100'),
    ('200', '10 CFR 35.200'),
    ('300', '10 CFR 35.300'),
    ('500', '10 CFR 35.500'),
    ('200 exception', '10 CFR 35.200 (except generators)'),
  )

  full_name = models.CharField(max_length=50)
  credentials = models.CharField(max_length=50, null=True, blank=True)
  material_and_use = MultiSelectField(max_length=255, choices=MATERIAL_AND_USE_CHOICES)

  def __str__(self):
    return f'{self.full_name}'

# everything will relate to permit
class Permit(models.Model):

  INSPECTION_PRIORITY_CHOICES = (
    (2, 2),
    (3, 3),
    (5, 5),
  )

  PROGRAM_CODE_CHOICES = (
    (2110, 2110),
    (2120, 2120),
    (2121, 2121),
    (3610, 3610),
    (3620, 3620),
    (2240, 2240),
  )

  office_code = models.IntegerField()
  city = models.CharField(max_length=40)
  state_abbrev = models.CharField(max_length=2)
  permit_num = models.CharField(max_length=11)
  docket_num = models.CharField(max_length=9, null=True, blank=True)
  exp_date = models.DateField()
  program_codes = MultiSelectField(choices=PROGRAM_CODE_CHOICES, max_length=20)
  inspection_priority = models.IntegerField(choices=INSPECTION_PRIORITY_CHOICES, default='3') 
  material = models.ManyToManyField(Material, blank=True, related_name='permit')
  authorized_user = models.ManyToManyField(AuthorizedUser, blank=True, related_name='permit')
  permit_program = models.ManyToManyField(PermitProgram, blank=True, related_name='permit')
  primary_rso = models.ForeignKey(RSO, models.SET_NULL, related_name='permit_rso', blank=True, null=True)
  alt_rso = models.ForeignKey(RSO, models.SET_NULL, related_name='permit_alt_rso', blank=True, null=True)

  def __str__(self):
    return f'{self.city}, {self.state_abbrev}'