from django.urls import path
from . import views

urlpatterns = [
    path('', views.getTimeTableByName, name='routes'),
]
