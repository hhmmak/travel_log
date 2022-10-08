from flask_app.config.mysqlconnection import connectToMySQL

class City:

    db_name = 'travel_log_schema'

    #.. get methods
    @classmethod
    def get_city_by_name(cls,data):
        query = "SELECT * FROM cities WHERE name = %(city)s;"
        results = connectToMySQL(cls.db_name).query_db(query,data)
        print("=======\n", results, "\n=======")
        city_id =  results[0]['id'] if results else None
        return city_id

    #.. add methods
    @classmethod
    def add_city(cls,data):
        query = "INSERT INTO cities (name) VALUE (%(city)s);"
        return connectToMySQL(cls.db_name).query_db(query,data)     # return city id