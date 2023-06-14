import json
import os
import api.internal.utils

from django.http import HttpResponse, JsonResponse


def consultations(request):
    data = json.loads(request.body.decode('utf-8'))
    if request.method == 'DELETE':
        return HttpResponse(status=200) if _deleteConsultations(data) else HttpResponse(status=500)
    elif request.method == 'PUT':
        _addConsultations(data)
        return HttpResponse(status=200)
    elif request.method == 'POST':
        retrieved = _getConsultations(data)
        if retrieved is not None:
            return JsonResponse(retrieved, safe=False)
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=405)


def setBanner(request):
    if request.method != 'PUT':
        return HttpResponse(status=405)
    new_data = json.loads(request.body.decode('utf-8'))
    path = './lecturers/' + str(new_data['lecturer_id']) + '/data.json'

    data = api.internal.utils.jsonFromFile(path)
    if data is not None:
        data['body']['banner'] = new_data['body']['banner']
        with open(path, 'w') as file:
            json.dump(data, file)
    else:
        new_data['body']['consultations'] = {'occurrences': []}
        with open(path, 'w') as file:
            json.dump(data, file)
    return HttpResponse(status=200)


def _getNewContentAfterDelete(data, to_delete):
    result = []
    removed_room_data = []
    for occurrence in data['body']['consultations']['occurrences']:
        should_remove = False
        for delete_occurrence in to_delete['body']['consultations']['occurrences']:
            if occurrence['id'] == delete_occurrence['id']:
                should_remove = True
                break
        if should_remove:
            removed_room_data.append({'room_id': occurrence['room_id'], 'id': occurrence['id']})
        else:
            result.append(occurrence)
    return result, removed_room_data


def _deleteFromLecturer(to_delete):
    path = './lecturers/' + str(to_delete['lecturer_id']) + '/data.json'
    data = api.internal.utils.jsonFromFile(path)
    if data is None:
        return None

    data['body']['consultations']['occurrences'], removed_room_data = _getNewContentAfterDelete(data, to_delete)
    with open(path, 'w') as file:
        json.dump(data, file)

    return removed_room_data


def _deleteFromRooms(removed_room_data, lecturer_id):
    for room_data in removed_room_data:
        path = './rooms/' + str(room_data['room_id']) + '/data.json'
        data = api.internal.utils.jsonFromFile(path)
        if data is None:
            continue

        data = [
            consultation for consultation in data
            if consultation['id'] != room_data['id'] or consultation['lecturer_id'] != lecturer_id
        ]

        with open(path, 'w') as file:
            json.dump(data, file)


def _deleteConsultations(data):
    removed_room_data = _deleteFromLecturer(data)
    if removed_room_data is None:
        return False

    _deleteFromRooms(removed_room_data, data['lecturer_id'])
    return True


def _addToLecturer(to_add):
    lecturer_id = to_add['lecturer_id']
    path = './lecturers/' + str(lecturer_id) + '/data.json'
    dir = './lecturers/' + str(lecturer_id)
    if not os.path.exists(dir):
        os.mkdir(dir)

    data = api.internal.utils.jsonFromFile(path)
    if data:
        data['body']['consultations']['occurrences'].extend(to_add['body']['consultations']['occurrences'])
        with open(path, 'w') as file:
            json.dump(data, file)
    else:
        to_add['body']['banner'] = ""
        with open(path, 'w') as file:
            json.dump(to_add, file)


def _addToRooms(to_add):
    for consultation in to_add['body']['consultations']['occurrences']:
        room_id = consultation['room_id']
        path = './rooms/' + str(room_id) + '/data.json'
        dir = './rooms/' + str(room_id)
        if not os.path.exists(dir):
            os.mkdir(dir)

        consultation["lecturer_id"] = to_add['lecturer_id']

        data = api.internal.utils.jsonFromFile(path)
        if data:
            data.append(consultation)
            with open(path, 'w') as file:
                json.dump(data, file)
        else:
            data = [consultation]
            with open(path, 'w') as file:
                json.dump(data, file)


def _addConsultations(data):
    _addToLecturer(data)
    _addToRooms(data)


def _getConsultationsForLecturer(lecturer_id):
    path = './lecturers/' + str(lecturer_id) + '/data.json'
    data = api.internal.utils.jsonFromFile(path)
    return data if data is not None else []


def _getConsultationsForRoom(room_id):
    path = './rooms/' + str(room_id) + '/data.json'
    data = api.internal.utils.jsonFromFile(path)
    return data if data is not None else []


def _getConsultations(data):
    if 'lecturer_id' in data:
        return _getConsultationsForLecturer(data['lecturer_id'])
    if 'room_id' in data:
        return _getConsultationsForRoom(data['room_id'])
    return None
