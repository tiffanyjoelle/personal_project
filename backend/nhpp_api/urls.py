from django.urls import path
from . import views

urlpatterns = [
    path('', views.PermitView.as_view()), # add permit
    path('<int:office_code>', views.PermitView.as_view()), # edit/delete permit, change RSO on permit, create new RSO
    path('RSO', views.RSOView.as_view()), # just a get to see all
    path('RSO/<int:pk>', views.RSOView.as_view()), # edit/delete RSO
    # path('<int:office_code>/materials', views.MaterialView.as_view()), # view facility materials
    # path('<int:office_code>/authorized_users', views.AUView.as_view()), # add/edit/delete authorized users
]