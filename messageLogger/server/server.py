from flask import Flask, request
from rollercoasters import RollerCoasterDB

app = Flask(__name__)
# ROLLERCOASTERS = [
#     "Cannibal",
#     "Twisted Coolosus",
#     "Samurai"
# ]

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

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()