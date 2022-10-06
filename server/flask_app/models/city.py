from flask_app.config.mysqlconnection import connectToMySQL

class City:

    db_name = 'travel_log_schema'

    #.. get methods
    @classmethod
    def get_city_by_name(cls,data):
        query = "SELECT * FROM locations WHERE name = %(name)s;"
        results = connectToMySQL(cls.db_name).query_db(query,data)
        location = {
            "cityId": results[0]['id']
        }
        return location

    #.. add methods
    @classmethod
    def add_city(cls,data):
        query = "INSERT INTO locations (name) VALUE (%(city)s);"
        return connectToMySQL(cls.db_name).query_db(query,data)     # return city id