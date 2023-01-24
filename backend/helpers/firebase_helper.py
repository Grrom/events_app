import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate(
    './events-app-34c6b-firebase-adminsdk-ct9gf-9e145312b4.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

events_collection = "events"


def create_event(name, date):
    doc_ref = db.collection(events_collection).document()
    doc_ref.set({
        u'name': name,
        u'date': date,
    })


def get_events():
    users_ref = db.collection(events_collection)
    docs = users_ref.stream()

    events = []

    for doc in docs:
        dict = doc.to_dict()
        dict["id"] = doc.id
        events.append(dict)

    return events


def delete_event(id):
    return db.collection(events_collection).document(id).delete()


def update_event(id, name, date):
    print(id)
    doc_ref = db.collection(events_collection).document(id)
    doc_ref.set({
        u'name': name,
        u'date': date,
    })
