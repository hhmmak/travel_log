from flask_app.config.mysqlconnection import connectToMySQL

class Location:

    db_name = 'travel_log_schema'

    #.. get methods
    @classmethod
    def get_location_by_name(cls,data):
        query = "SELECT * FROM locations WHERE name = %(name)s;"
        results = connectToMySQL(cls.db_name).query_db(query,data)
        location = {
            "locationId": results[0]['id']
        }
        return location

    #.. add methods
    @classmethod
    def add_location(cls,data):
        query = "INSERT INTO locations (name) VALUE (%(location)s);"
        return connectToMySQL(cls.db_name).query_db(query,data)     # return location id