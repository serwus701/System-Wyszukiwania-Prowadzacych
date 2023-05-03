import json

from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime
import json
import sys
from api.usosapi import *
import time

usosapi_base_url = 'https://apps.usos.pwr.edu.pl/'
consumer_key = '7xmmfG4DrREekVXwn8g4'
consumer_secret = 'jrnYueRwQhCCd8ZxnvW6LT6a3cbepJhavFBEeLXV'
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
        print(params)
        response = usos.get('services/geo/rooms', **params)
        filtered_json = {k:v for k, v in response.items() if v is not None}
        merged_dict.update(filtered_json)
        time.sleep(0.5)
    with open('./cache/classrooms.json', 'w') as f:
        json.dump(merged_dict, f)
    return JsonResponse("ok", safe=False)
