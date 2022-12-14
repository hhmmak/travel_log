from flask_app.config.mysqlconnection import connectToMySQL

class Country:

    db_name = 'travel_log_schema'

    #.. get methods
    @classmethod
    def get_all_countries(cls):
        query = "SELECT * FROM countries;"
        results = connectToMySQL(cls.db_name).query_db(query)
        countries = []
        for row in results:
            country = {
                'countryId': row['id'],
                'country': row['name']
            }
            countries.append(country)
        return countries

    @classmethod
    def get_country_by_id(cls,data):
        query = "SELECT * FROM countries WHERE id = %(id)s;"
        results = connectToMySQL(cls.db_name).query_db(query, data)
        country = {
            "country": results[0]['name'],
            "countryAbbr": results[0]['abbr']
        }
        return country

    @classmethod
    def get_country_by_name(cls,data):
        query = "SELECT * FROM countries WHERE name = %(country)s;"
        results = connectToMySQL(cls.db_name).query_db(query, data)
        country_id =  results[0]['id']
        return country_id

