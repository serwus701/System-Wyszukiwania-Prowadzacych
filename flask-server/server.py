import os
import pathlib

import requests
from flask import Flask, session, abort, redirect, request, Response
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests

app = Flask("Google Login App")
app.secret_key = "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" # make sure this matches with that's in client_secret.json

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev

GOOGLE_CLIENT_ID = "928732582264-u78i3eoakbrsppi84ris4g2qke2ra868.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://localhost:8080/callback"
)


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper


@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)






@app.route("/callback")
def callback():
    app.logger.info("Callback")
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  
        # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    return redirect("/protected_area")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/")
def index():
    return "Hello World <a href='/login'><button>Login</button></a>"


@app.route("/protected_area")
@login_is_required
def protected_area():
    return f"Hello {session['name']}! <br/> <a href='/logout'><button>Logout</button></a>"


@app.route("/class_room", methods = ['GET'])
def class_room():
    class_rooms = request.get_data()
    #find class rooms
    return Response(class_rooms, mimetype='application/json', status=200)

@app.route("/course", methods = ['GET'])
def course():
    courses = request.get_data()
    #find courses
    return Response(courses, mimetype='application/json', status=200)

@app.route("/classes", methods = ['GET'])
def classes():
    lecturer = request.get_data()
    #find lecturers classes
    classes = 5
    return Response(classes, mimetype='application/json', status=200)

@app.route("/notice_board", methods = ['GET', 'POST'])
def notice_board():
    if request.method == 'POST':
        #create notice
        return Response("Notice Created", mimetype='application/json', status=200)
    if request.method == 'GET':
        lecturer = request.get_data()
        #find lecturers notice board
        notice_board = 5
        return Response(notice_board, mimetype='application/json', status=200)
    return Response("Error", mimetype='application/json', status=400)

@app.route("/privileges", methods = ['GET', 'POST'])
def privileges():
    if request.method == 'GET':
        lecturer = request.get_data()
        #find lecturers privileges
        privileges = 5
        return Response(privileges, mimetype='application/json', status=200)
    if request.method == 'POST':
        #create privilege
        return Response("Privilege Created", mimetype='application/json', status=200)
    return Response("Error", mimetype='application/json', status=400)

@app.route("/consultations", methods = ['POST'])
def consultations():
    consultation = request.get_json()
    #create consultation
    return Response(consultation, mimetype='application/json', status=200)



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)