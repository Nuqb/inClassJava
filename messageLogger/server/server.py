from flask import Flask, request
from dummydb import DummyDB

app = Flask(__name__)
db = DummyDB("dummydb.db")
print("db", db.readAllRecords())

# ROLLERCOASTERS = [
#     "Cannibal",
#     "Twisted Coolosus",
#     "Samurai"
# ]

@app.route ("/rollercoasters", methods=["GET"])
def retrieve_coasters():
    rollercoasters = db.readAllRecords()
    return db.readAllRecords(), 200, {"Access-Control-Allow-Origin" : "*"}

@app.route("/rollercoasters", methods=["POST"])
def create_coaster():
    print("The request data is: ", request.form)
    db.saveRecord(request.form["name"])
    return "Created", 201, {"Access-Control-Allow-Origin" : "*"}

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()