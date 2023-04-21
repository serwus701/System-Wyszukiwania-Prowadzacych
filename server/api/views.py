import json

from django.shortcuts import render
from django.http import JsonResponse
import oauth2 as oauth
from datetime import datetime
import urlparse3
import json
import sys
from api.usosapi import *

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
