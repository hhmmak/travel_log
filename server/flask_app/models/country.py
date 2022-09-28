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
                'country': row['country']
            }
            countries.append(country)
        return countries


    #.. add methods


    #.. validation methods

