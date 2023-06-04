import json
import os


def jsonFromFile(path):
    if not os.path.exists(path):
        return None
    with open(path, 'r') as file:
        try:
            return json.load(file)
        except ValueError:
            return None
