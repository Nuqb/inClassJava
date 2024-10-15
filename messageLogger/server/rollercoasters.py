import sqlite3

#connect to DB file 
connection = sqlite3.connect("rollercoasters_db.db")
import sqlite3

def dict_factory(cursor, row):
    fields = []

    for column in cursor.description:
        fields.append(column[0])

    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class RollerCoasterDB:

    def init(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def getRollerCoasters(self):
        self.cursor.execute("SELECT * FROM rollercoasters")
        return self.cursor.fetchall()


    def getRollerCoaster(self, id):
        data = [id]
        self.cursor.execute("SELECT * FROM rollercoasters WHERE id = ?", data)
        return self.cursor.fetchone()

    def createRollerCoaster(self, name, review, rating):
        data = [name, review, rating]
        self.cursor.execute("INSERT INTO rollercoasters (name, review, rating) VALUES (?, ?, ?)", data)
        self.connection.commit()