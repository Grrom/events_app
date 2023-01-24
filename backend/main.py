from flask import Flask

app = Flask("/")


@app.route("/createEvent")
def createEvent():
    return "createEvent"


@app.route("/listEvent")
def listEvent():
    return "listEvent"


@app.route("/updateEvent")
def updateEvent():
    return "updateEvent"


@app.route("/deleteEvent")
def deleteEvent():
    return "deleteEvent"


app.run(host="0.0.0.0", port=8080)
