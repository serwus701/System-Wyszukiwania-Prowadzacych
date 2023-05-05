import json

from django.shortcuts import render
from django.http import JsonResponse
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
    query = json.loads(request.body.decode('utf-8'))
    params = {'format': 'json', 'lang': 'pl', 'fields': 'items', 'query': query}
    response = usos.get('services/users/search2', **params)

    return JsonResponse(response)


def getTimeTableByName(request):
    lecturer_response = json.loads(getByName(request).content)
    id = lecturer_response["items"][0]["user"]["id"]
    params = {'format': 'json', 'user_id': id}
    response = usos.get('services/tt/staff', **params)

    return JsonResponse(response, safe=False)

def getAllClassroms(request):
    merged_dict = {}
    for j in range(10,25):
        query = ""
        for i in range(j*100, j*100+100):
                query = query + str(i)
                if i != j*100+100-1:
                    query = query + "|"
        params = {'format': 'json', 'fields': 'id|number|building_id|building_name', 'room_ids': str(query)}
        response = usos.get('services/geo/rooms', **params)
        filtered_json = {k:v for k, v in response.items() if v is not None}
        merged_dict.update(filtered_json)
        time.sleep(0.5)
    with open('./cache/classrooms.json', 'w') as f:
        json.dump(merged_dict, f)
    return JsonResponse("ok", safe=False)

def getAllLecturers(request):
    with open('./cache/lecturers_tmp.json', 'w') as f:
        for j in range(0, 4000):
            query = ""
            for i in range(j*100,j*100+100):
                query = query + str(i)
                if i != j*100+100-1:
                    query = query + "|"
            params = {'user_ids': str(query), 'fields': 'id|first_name|last_name', 'format': 'json'}
            response = usos.get('services/users/users', **params)
            if bool(response):
                filtered_json = {k:v for k, v in response.items() if v is not None}
                json.dump(filtered_json, f)
                f.write('\n')
            time.sleep(0.34)

    with open('./cache/lecturers_tmp.json', 'r') as f:
        lines = f.readlines()

    with open('./cache/lecturers.json', 'w') as f:
        for line in lines:
            if line.strip() and line.strip() != '{}':
                f.write(line)
    
    os.remove('./cache/lecturers_tmp.json')

    return JsonResponse("ok", safe=False)
