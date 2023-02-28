from django.urls import path
from . import views

urlpatterns = [
    path('', views.GetPermitView.as_view()), # view all permit
    path('new', views.PostPermitView.as_view()), # add new permit
    path('<int:office_code>', views.GetPermitView.as_view()), # view permit
    path('<int:office_code>/edit', views.PostPermitView.as_view()), # edit/delete permit, change RSO on permit
    path('RSO', views.RSOView.as_view()), # see all and add new (only for PM)
    path('RSO/<int:pk>', views.RSOView.as_view()), # edit/delete RSO
    path('program_codes', views.ProgramCodesView.as_view()), # get all program codes
    path('materials', views.MaterialView.as_view()), # get all materials
    path('inspection_priorities', views.InspectionPriorityView.as_view()), #get all inspection priorities
    path('authorized_uses', views.AuthorizedUseView.as_view()), #get all authorized uses
    path('authorized_users', views.AuthorizedUserView.as_view()), #get all authorized users
    path('permit_programs', views.PermitProgramView.as_view()), #get all permit programs
    path('facility/<int:office_code>', views.FacilityInfoView.as_view()),
    # path('<int:office_code>/authorized_users', views.AUView.as_view()), # add/edit/delete authorized users
]