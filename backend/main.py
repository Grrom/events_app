from flask import Flask
from flask import request

import json

app = Flask("/")

json_dir = "./jsons/"


@app.route("/createEvent")
def createEvent():
    with json.load(f'{json_dir}events.json') as f:
        print(type(f))
        # json.dump(request.args.get("event_name"), f)
    return "createEvent"


@app.route("/listEvent")
def listEvent():
    with open('data.json', 'w') as f:
        return f


@app.route("/updateEvent")
def updateEvent():
    events = ""
    with open('data.json', 'w') as f:
        events = f

    return f


@app.route("/deleteEvent")
def deleteEvent():
    return "deleteEvent"


app.run(host="0.0.0.0", port=8080)
