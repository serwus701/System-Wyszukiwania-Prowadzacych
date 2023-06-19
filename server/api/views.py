import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
import json
import api.internal.utils
import api.internal.consultations
from api.usosapi import *
import time
import os

usosapi_base_url = 'https://apps.usos.pwr.edu.pl/'
consumer_key = json.loads(open('./settings.json').read())['usos_key']
consumer_secret = json.loads(open('./settings.json').read())['usos_secret']
usos = USOSAPIConnection(usosapi_base_url, consumer_key, consumer_secret)


def getByName(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    query = json.loads(request.body.decode('utf-8'))
    params = {'format': 'json', 'lang': 'pl', 'fields': 'items', 'query': query}
    response = usos.get('services/users/search2', **params)

    return JsonResponse(response)


def createFoldersForNewUsers(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    lecturers = json.loads(open('./cache/lecturers.json').read())
    for lecturer in lecturers:
        if not os.path.exists('./lecturers/' + lecturer["id"]):
            os.makedirs('./lecturers/' + lecturer["id"])
    return JsonResponse("ok", safe=False)


def getTimeTableByName(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    lecturer_response = json.loads(getByName(request).content)
    id = lecturer_response["items"][0]["user"]["id"]

    params = {'format': 'json', 'user_id': id,
              'fields': 'start_time|end_time|name|room_number|building_name|classtype_name|classtype_name|classtype_name'}
    response = usos.get('services/tt/staff', **params)

    return JsonResponse(response, safe=False)


def getTimeTableById(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    data = json.loads(request.body.decode('utf-8'))
    params = {'format': 'json', 'user_id': data['id'],
              'fields': 'start_time|end_time|name|room_number|building_name|classtype_name|classtype_name|classtype_name'}
    response = usos.get('services/tt/staff', **params)

    return JsonResponse(response, safe=False)


def getAllClassroms(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    merged_dict = {}
    for j in range(10, 25):
        query = ""
        for i in range(j * 100, j * 100 + 100):
            query = query + str(i)
            if i != j * 100 + 100 - 1:
                query = query + "|"
        params = {'format': 'json', 'fields': 'id|number|building_id|building_name', 'room_ids': str(query)}
        response = usos.get('services/geo/rooms', **params)
        filtered_json = {k: v for k, v in response.items() if v is not None}
        merged_dict.update(filtered_json)
        time.sleep(0.5)
    with open('./cache/classrooms.json', 'w') as f:
        json.dump(merged_dict, f)
    return HttpResponse(status=200)


def getClassroom(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    data = json.loads(request.body.decode('utf-8'))
    params = {'format': 'json', 'room_id': data['room_id'], 'start': data['start']}
    response = usos.get('services/tt/room', **params)
    return JsonResponse(response, safe=False)


def consultations(request):
    return api.internal.consultations.consultations(request)


def setBanner(request):
    return api.internal.consultations.setBanner(request)


def getAllLecturers(request):
    if request.method != 'POST':
        return HttpResponse(status=405)

    with open('./cache/lecturers.json', 'w') as file:
        is_first_saved = False
        file.write("[")
        chunk_size = 100
        for j in range(0, 1000000, chunk_size):
            query = ""
            for i in range(j, j + chunk_size):
                query = query + str(i)
                if i != j + chunk_size - 1:
                    query += "|"
            params = {'user_ids': query, 'fields': 'id|first_name|last_name', 'format': 'json'}
            response = usos.get('services/users/users', **params)
            if response:
                filtered_json = [v for k, v in response.items() if v is not None]
                for lecturer in filtered_json:
                    if is_first_saved:
                        file.write(',\n')
                    json.dump(lecturer, file)
                    is_first_saved = True
            time.sleep(0.34)
        file.write("]")

    return HttpResponse(status=200)

def getTitle(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    data = json.loads(request.body.decode('utf-8'))
    params = {'format': 'json', 'user_id': data['id'], 'fields': 'titles'}
    response = usos.get('services/users/user', **params)
    return JsonResponse(response, safe=False)
