from flask_app.config.mysqlconnection import connectToMySQL

class Country:

    db_name = 'travel_log_schema'

    def __init__(self, data):
        self.id = data['id']
        self.country = data['country']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    #.. get methods
    @classmethod
    def get_all_countries(cls):
        query = "SELECT * FROM countries;"
        results = connectToMySQL(cls.db_name).query_db(query)
        countries = []
        for row in results:
            country = {
                'id': row['id'],
                'country': row['name']
            }
            countries.append(country)
        return countries

    @classmethod
    def get_country_by_id(cls,data):
        query = "SELECT * FROM countries WHERE id = %(id)s;"
        results = connectToMySQL(cls.db_name).query_db(query, data)
        country = {
            "name": results[0]['name'],
            "abbr": results[0]['abbr']
        }
        return country

    def get_country_by_name(cls,data):
        query = "SELECT * FROM countries WHERE name = %(name)s;"
        results = connectToMySQL(cls.db_name).query_db(query, data)
        country = {
            "id": results[0]['id'],
            "abbr": results[0]['abbr']
        }
        return country

