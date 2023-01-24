from flask_cors import CORS
from flask import Flask
from flask import request

import helpers.firebase_helper as firebase_helper

app = Flask("/")
app = Flask(__name__)
CORS(app)


@app.route("/create_event", methods=["POST"])
def create_event():
    args = request.form
    firebase_helper.create_event(
        args.get("event_name"), args.get("event_date"))
    return "event created"


@app.route("/list_events")
def list_event():
    return firebase_helper.get_events()


@app.route("/update_event")
def update_event():
    args = request.form
    firebase_helper.update_event(
        args.get("id"), args.get("event_name"), args.get("event_date"))
    return "event updated"


@app.route("/delete_event")
def delete_event():
    firebase_helper.delete_event(request.args.get("event_id"))
    return "event deleted"


app.run(host="0.0.0.0", port=8080)
