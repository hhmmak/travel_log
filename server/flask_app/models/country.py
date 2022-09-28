from flask_app.config.mysqlconnection import connectToMySQL

class Country:

    db_name = 'travel_log_schema'

    def __init__(self, data):
        self.id = data['id']
        self.country = data['country']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    #.. get methods
    def get_all_countries(cls):
        query = "SELECT * FROM countries;"
        results = connectToMySQL(cls.db_name).query_db(query)
        countries = []
        for country in results:
            countries.append(cls(country))
        return countries


    #.. add methods


    #.. validation methods

