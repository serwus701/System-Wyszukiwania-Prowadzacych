import json

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from datetime import datetime
import json
import sys
from api.usosapi import *
import time
import os

usosapi_base_url = 'https://apps.usos.pwr.edu.pl/'
consumer_key = json.loads(open('./settings.json').read())['usos_key']
consumer_secret = json.loads(open('./settings.json').read())['usos_secret']
usos = USOSAPIConnection(usosapi_base_url, consumer_key, consumer_secret)


def getByName(request):
    if request.method != 'GET':
        return HttpResponse(status=405)
    query = json.loads(request.body.decode('utf-8'))
    params = {'format': 'json', 'lang': 'pl', 'fields': 'items', 'query': query}
    response = usos.get('services/users/search2', **params)

    return JsonResponse(response)


def createFoldersForNewUsers(request):
    if request.method != 'GET':
        return HttpResponse(status=405)
    lecturers = json.loads(open('./cache/lecturers.json').read())
    for lecturer in lecturers:
        if not os.path.exists('./lecturers/' + lecturer["id"]):
            os.makedirs('./lecturers/' + lecturer["id"])
    return JsonResponse("ok", safe=False)


def getTimeTableByName(request):
    if request.method != 'GET':
        return HttpResponse(status=405)
    lecturer_response = json.loads(getByName(request).content)
    id = lecturer_response["items"][0]["user"]["id"]

    params = {'format': 'json', 'user_id': id,
              'fields': 'start_time|end_time|name|room_number|building_name|classtype_name|classtype_name|classtype_name'}
    response = usos.get('services/tt/staff', **params)

    return JsonResponse(response, safe=False)


def getAllClassroms(request):
    if request.method != 'GET':
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
    if request.method != 'GET':
        return HttpResponse(status=405)
    data = json.loads(request.body.decode('utf-8'))
    params = {'format': 'json', 'room_id': data['room_id'], 'start': data['start']}
    response = usos.get('services/tt/room', **params)
    return JsonResponse(response, safe=False)

@login_required
def assign_permissions(request):
    user = request.user
    email = user.email
    print(user, email)
def getRoomConsultations(request):
    if request.method != 'GET':
        return HttpResponse(status=405)
    new_data = json.loads(request.body.decode('utf-8'))
    path = './rooms/' + str(new_data['room_id']) + '/data.json'
    if os.path.exists(path):
        file = open(path, 'r')
        data = json.load(file)
        file.close()
        return JsonResponse(data, safe=False)
    return HttpResponse(status=500)


def consultations(request):
    if request.method == 'DELETE':
        new_data = json.loads(request.body.decode('utf-8'))
        path = './lecturers/' + str(new_data['lecturer_id']) + '/data.json'
        if not os.path.exists(path):
            return HttpResponse(status=500)
        file = open(path, 'r')
        data = json.load(file)
        file.close()
        file = open(path, 'w')
        room_id = 0
        for occurrence in data['body']['consultations']['occurrences']:
            if occurrence['id'] == new_data['body']['consultations']['occurrences'][0]['id']:
                room_id = occurrence['room_id']

        data['body']['consultations']['occurrences'] = [
            occurrence for occurrence in data['body']['consultations']['occurrences']
            if occurrence['id'] != new_data['body']['consultations']['occurrences'][0]['id']
        ]
        json.dump(data, file)
        file.close()

        path = './rooms/' + str(room_id) + '/data.json'
        if not os.path.exists(path):
            return HttpResponse(status=500)
        file = open(path, 'r')
        data = json.load(file)
        file.close()
        file = open(path, 'w')

        data = [
            consultation for consultation in data
            if consultation['id'] != new_data['body']['consultations']['occurrences'][0]['id'] and consultation[
                'lecturer_id'] != new_data['lecturer_id']
        ]
        json.dump(data, file)
        file.close()

        return HttpResponse(status=200)
    elif request.method == 'POST':
        new_data = json.loads(request.body.decode('utf-8'))
        path = './lecturers/' + str(new_data['lecturer_id']) + '/data.json'
        if not os.path.exists('./lecturers/' + str(new_data['lecturer_id'])):
            os.mkdir('./lecturers/' + str(new_data['lecturer_id']))
        if os.path.exists(path):
            file = open(path, 'r')
            data = json.load(file)
            file.close()
            file = open(path, 'w')
            data['body']['consultations']['occurrences'].extend(new_data['body']['consultations']['occurrences'])
            json.dump(data, file)
            file.close()
        else:
            new_data['banner'] = ""
            file = open(path, 'w')
            json.dump(new_data, file)
            file.close()

        for consultation in new_data['body']['consultations']['occurrences']:
            room_path = './rooms/' + str(consultation['room_id']) + '/data.json'
            consultation["lecturer_id"] = new_data['lecturer_id']
            if not os.path.exists('./rooms/' + str(consultation['room_id'])):
                os.mkdir('./rooms/' + str(consultation['room_id']))
            if os.path.exists(room_path):
                file = open(room_path, 'r')
                data = json.load(file)
                file.close()
                file = open(room_path, 'w')
                data.append(consultation)
                json.dump(data, file)
                file.close()
            else:
                file = open(room_path, 'w')
                data = [consultation]
                json.dump(data, file)
                file.close()

        return HttpResponse(status=200)
    elif request.method == 'GET':
        new_data = json.loads(request.body.decode('utf-8'))
        path = './lecturers/' + str(new_data['lecturer_id']) + '/data.json'
        if os.path.exists(path):
            file = open(path, 'r')
            data = json.load(file)
            file.close()
            return JsonResponse(data)
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=405)


def setBanner(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    new_data = json.loads(request.body.decode('utf-8'))
    path = './lecturers/' + str(new_data['lecturer_id']) + '/data.json'
    if os.path.exists(path):
        file = open(path, 'r')
        data = json.load(file)
        file.close()
        file = open(path, 'w')
        data['body']['banner'] = new_data['body']['banner']
        json.dump(data, file)
        file.close()
    else:
        new_data['body']['consultations'] = {'occurrences': []}
        file = open(path, 'w')
        json.dump(new_data, file)
        file.close()
    return HttpResponse(status=200)


def getAllLecturers(request):
    if request.method != 'GET':
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
