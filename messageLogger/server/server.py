from flask import Flask, request
from rollercoasters import RollerCoasterDB

app = Flask(__name__)


@app.route("/rollercoasters/<int:coaster_id>", methods=["OPTIONS"])
def handle_cors_options(coaster_id):
    return "", 204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type"
    }

@app.route("/rollercoasters", methods=["GET"])
def retrieve_coasters():
    db = RollerCoasterDB("rollercoasters_db.db")
    ROLLERCOASTERS = db.getRollerCoasters()
    return ROLLERCOASTERS, 200, {"Access-Control-Allow-Origin" : "*"}


@app.route("/rollercoasters", methods=["POST"])
def create_coaster():
    db = RollerCoasterDB("rollercoasters_db.db")
    print("the request data is: ", request.form)
    name = request.form["name"]
    review = request.form["review"]
    rating = request.form["rating"]
    db.createRollerCoaster(name, review, rating)
    # db.saveRecord(request.form["name"])

    return "Created", 201, {"Access-Control-Allow-Origin" : "*"}

@app.route("/rollercoasters/<int:coaster_id>", methods=["PUT"])
def update_coaster(coaster_id):
    print("the update request data is: ", request.form)
    db = RollerCoasterDB("rollercoasters_db.db")
    rollercoaster = db.getRollerCoaster(coaster_id)
    if rollercoaster:
        name = request.form["name"]
        review = request.form["review"]
        rating = request.form["rating"]
        db.updateRollerCoaster(coaster_id, name, review, rating)
        return "Updated", 200, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"coaster {coaster_id} Not found", 404, {"Access-Control-Allow-Origin" : "*"}
    

@app.route("/rollercoasters/<int:coaster_id>", methods=["DELETE"])
def delete_coaster(coaster_id):
    db = RollerCoasterDB("rollercoasters_db.db")
    if db.getRollerCoaster(coaster_id) is None:
        return f"coaster {coaster_id} Not found", 404, {"Access-Control-Allow-Origin" : "*"}
    else: 
        db.deleteRollerCoaster(coaster_id)
        return "Deleted", 200, {"Access-Control-Allow-Origin" : "*"}

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()