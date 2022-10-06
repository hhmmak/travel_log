
#.. MySQL queries

# INSERT INTO destinations (location_id, city_id, country_id) VALUES (NULL,2,106);

# SELECT destinations.id, location_id, locations.name, city_id, cities.name, country_id, countries.name, countries.abbr FROM destinations 
# 	LEFT JOIN locations ON destinations.location_id = locations.id 
#     LEFT JOIN cities ON destinations.city_id = cities.id 
#     LEFT JOIN countries ON destinations.country_id = countries.id;

from flask_app.config.mysqlconnection import connectToMySQL

class Country:

    db_name = 'travel_log_schema'

    #.. get methods
    @classmethod
    def get_one_destination(cls, data):
        query = "SELECT location_id, locations.name, city_id, cities.name, country_id, countries.name, countries.abbr FROM destinations \
                    LEFT JOIN locations ON destinations.location_id = locations.id \
                    LEFT JOIN cities ON destinations.city_id = cities.id \
                    LEFT JOIN countries ON destinations.country_id = countries.id \
                    WHERE destinations.id = %(id)s";
        results = connectToMySQL(cls.db_name).query_db(query)
        destination = {
            "locationId": results[0]['location_id'],
            "location": results[0]['locations.name'],
            "cityId": results[0]['city_id'],
            "city": results[0]['cities.name'],
            "countryId": results[0]['country_id'],
            "country": results[0]['countries.name'],
            "countryAbbr": results[0]['countries.abbr']
        }
        return destination