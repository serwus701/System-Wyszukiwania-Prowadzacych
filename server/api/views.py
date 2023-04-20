import json

from django.shortcuts import render
from django.http import JsonResponse
import oauth2 as oauth
from datetime import datetime
import urlparse3
import json
import sys

usosapi_base_url = 'https://apps.usos.pwr.edu.pl/';
consumer_key = ''
consumer_secret = ''


def getRoutes(request):
    return JsonResponse('API', safe=False)


def _read_token(content):
    arr = dict(urlparse3.parse_qsl(content))
    return oauth.Token(arr['oauth_token'], arr['oauth_token_secret'])


def getByName(request):
    if request.method == 'GET':
        usosapi_base_url_secure = usosapi_base_url.replace("http://", "https://")
        consumer = oauth.Consumer(consumer_key, consumer_secret)
        request_token_url = usosapi_base_url_secure + 'services/oauth/request_token'
        authorize_url = usosapi_base_url + 'services/oauth/authorize'
        access_token_url = usosapi_base_url_secure + 'services/oauth/access_token'
        # Step 1. Request Token
        client = oauth.Client(consumer)
        resp, content = client.request(request_token_url, "GET", callback_url='oob')
        if resp['status'] != '200':
            raise Exception("Invalid response %s:\n%s" % (resp['status'], content))

        request_token = _read_token(content)
        oauth_verifier = input('What is the PIN code? ')
        # Step 3. Access Token
        request_token.set_verifier(oauth_verifier)
        client = oauth.Client(consumer, request_token)
        resp, content = client.request(access_token_url, "GET")
        try:
            access_token = _read_token(content)
        except KeyError:
            print
            "Cound not retrieve Access Token (invalid PIN?)."
            sys.exit(1)
    resp, content = client.request(usosapi_base_url + "services/search2?start=" + "lang=pl&fields=items" + "&query=Bawiec&format=json", "GET")
    if resp['status'] != '200':
        raise Exception(u"Invalid response %s.\n%s" % (resp['status'], content))
    content = json.loads(content)

    return JsonResponse(content)
