from django.urls import path
from . import views

urlpatterns = [
    path('ttbyname', views.getTimeTableByName, name='ttbyname'),
    path('classrooms', views.getAllClassroms, name='allClassrooms'),
    path('classroom', views.getClassroom, name='classroom'),
    path('lecturers', views.getAllLecturers, name='allLecturers'),
    path('createfolders', views.createFoldersForNewUsers, name='createFolders')
]
