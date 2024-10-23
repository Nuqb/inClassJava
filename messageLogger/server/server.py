from flask import Flask, request
from rollercoasters import RollerCoasterDB

app = Flask(__name__)

@app.route("rollercoasters/<int:coaster_id>", methods=["OPTIONS"])
def handle_cors_request(coaster_id):
    return "", 204, {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "PUT, DELETE",
        "Access-Control-Allow-Headers" : "Content-Type"
    }

@app.route ("/rollercoasters", methods=["GET"])
def retrieve_coasters():
    db = RollerCoasterDB("rollercoasters_db.db")
    rollercoasters = db.getRollerCoasters()
    return rollercoasters, 200, {"Access-Control-Allow-Origin" : "*"}

@app.route("/rollercoasters", methods=["POST"])
def create_coaster():
    print("The request data is: ", request.form)
    name = request.form["name"]
    review = request.form["review"]
    rating = request.form["rating"]
    db = RollerCoasterDB("rollercoasters_db.db")
    db.createRollerCoaster(name,review,rating)
    return "Created", 201, {"Access-Control-Allow-Origin" : "*"}

@app.route("/rollercoasters/<int:coaster_id>", methods=["PUT"])
def update_coaster(coaster_id):
    print("update coaster with ID ", coaster_id)
    db = RollerCoasterDB("rollercoasters_db.db")
    rollercoaster = db.getRollerCoaster(coaster_id)
    if rollercoaster:
        name = request.form["name"]
        review = request.form["review"]
        rating = request.form["rating"]
        db.updateRollerCoaster(coaster_id,name,review,rating)
        return "Update", 200, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"roller coaster with {coaster_id} not found", 404, {"Access-Control-Allow-Origin" : "*"}

    


def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()