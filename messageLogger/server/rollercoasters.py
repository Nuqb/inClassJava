import sqlite3
def dict_factory(cursor, row):
 fields = []
 # Extract column names from cursor description
 for column in cursor.description:
    fields.append(column[0])

 # Create a dictionary where keys are column names and values are row values
 result_dict = {}
 for i in range(len(fields)):
    result_dict[fields[i]] = row[i]

 return result_dict

class RollerCoasterDB:
    def __init__(self,filename):
        #connect to DB file
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        #use the connection instance to perform db operations
        #create a cursor instance for the connection
        self.cursor = self.connection.cursor()

    def getRollerCoasters(self):
        #now that we have an access point we can fetch all or one
        #ONLY applicable use of fetch is following a SELECT query
        self.cursor.execute("SELECT * FROM rollercoasters")
        rollercoasters = self.cursor.fetchall()
        return rollercoasters
    
    def getRollerCoaster(self,coaster_id):
        
        data = [coaster_id]
        self.cursor.execute("SELECT * FROM rollercoasters WHERE id = ?",data)
        rollercoaster = self.cursor.fetchone()
        return rollercoaster

    def createRollerCoaster(self,name,review,rating):
        data = [name,review,rating]
        #add a new rollercoaster to our db
        self.cursor.execute("INSERT INTO rollercoasters(name,review,rating)VALUES(?,?,?)",data)
        self.connection.commit()
    
    def updateRollerCoaster(self,coaster_id,name,review,rating):
        data = [coaster_id,name,review,rating]
        self.cursor.execute("UPDATE rollercoasters SET name = ?, review = ?, rating = ? WHERE id = ?",data)
        