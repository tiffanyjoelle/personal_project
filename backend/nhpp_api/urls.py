from django.urls import path
from . import views

urlpatterns = [
    path('', views.PermitView.as_view()),
    path('<int:office_code>', views.PermitView.as_view()),
    path('<int:office_code>/materials', views.MaterialsView.as_view())
]