from django.urls import path
from . import views

urlpatterns = [
    path('', views.FacilityView.as_view()),
    path('<int:office_code>', views.FacilityView.as_view())
]