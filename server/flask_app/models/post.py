from flask_app.config.mysqlconnection import connectToMySQL
from datetime import datetime, timedelta

DATE_FORMAT = '%Y-%m-%d'

class Post:

    # db_name = 'travel_schema'
    db_name = 'travel_log_schema'

    # def __init__(self, data):
    #     self.id = data['id']
    #     self.title = data['title']
    #     self.content = data['content']
    #     self.itinerary = data['itinerary']
    #     self.destination = f"{data['location']}, {data['country']}"
    #     self.user_id = data['user_id']
    #     self.user_username = data['username']
    #     self.date_from = data['date_from']
    #     self.date_to = data['date_to']
    #     self.duration = data['duration']
    #     self.created_at = data['created_at']
    #     self.updated_at = data['updated_at']

    #.. get methods

    @classmethod
    def get_all_posts(cls):
        #TODO query after change
        query = "SELECT * FROM posts \
            LEFT JOIN users ON posts.user_id = users.id \
            LEFT JOIN destinations ON posts.destination_id = destinations.id \
                LEFT JOIN locations ON destinations.location_id = locations.id \
                LEFT JOIN cities ON destinations.city_id = cities.id \
                LEFT JOIN countries ON destinations.country_id = countries.id;"
        # query = "SELECT * FROM posts LEFT JOIN users ON users.id = posts.user_id ORDER BY posts.created_at DESC;"
        results = connectToMySQL(cls.db_name).query_db(query)
        posts = []
        for row in results:
            post = {
                "userId": row['user_id'],
                "username": row['username'],
                "id": row['id'],
                "title": row['title'],
                "content": row['content'],
                "itinerary": row['itinerary'],
                # "location": row['destination'],
                # "country": row['country'],
                #TODO uncomment after change
                "location": row['name'],
                "location": row['cities.name'],
                "country": row['abbr'] if 'abbr' in row else row['country'],
                "duration": row['duration'],
                "dateFrom": row['date_from'].strftime(DATE_FORMAT),
                "dateTo": row['date_to'].strftime(DATE_FORMAT),
                "createdAt": row['created_at'].strftime(DATE_FORMAT)
            }
            posts.append(post)
        return posts

    @classmethod
    def get_post(cls, data):
        #TODO query after change
        query = "SELECT * FROM posts \
            LEFT JOIN users ON posts.user_id = users.id \
            LEFT JOIN destinations ON posts.destination_id = destinations.id \
                LEFT JOIN locations ON destinations.location_id = locations.id \
                LEFT JOIN cities ON destinations.city_id = cities.id \
                LEFT JOIN countries ON destinations.country_id = countries.id \
                WHERE posts.id = %(id)s;"
        # query = "SELECT * FROM users LEFT JOIN posts ON users.id = posts.user_id WHERE posts.id = %(id)s;"
        results = connectToMySQL(cls.db_name).query_db(query, data)
        # print("=======\nresults:", results, "\n============")
        post = {
            "userId": results[0]['user_id'],
            "username": results[0]['username'],
            "id": results[0]['id'],
            "title": results[0]['title'],
            "content": results[0]['content'],
            "itinerary": results[0]['itinerary'],
            # "location": results[0]['destination'],
            # "country": results[0]['country'],
            #TODO uncomment after change
            "location": results[0]['name'], #name in location table
            "location": results[0]['cities.name'],
            "country": results[0]['countries.name'],
            "duration": results[0]['duration'],
            "dateFrom": results[0]['date_from'].strftime(DATE_FORMAT),
            "dateTo": results[0]['date_to'].strftime(DATE_FORMAT),
            "createdAt": results[0]['created_at'].strftime(DATE_FORMAT)
        }
        return post


    #.. add methods
    @classmethod
    def add_post (cls,data):
        # with location/country table
        # query = "INSERT INTO posts (title, content, itinerary, destination_id, user_id, date_from, date_to, duration) VALUES (%(title)s, %(content)s, %(itinerary)s, %(destination_id)s, %(user_id)s, %(date_from)s, %(date_to)s, %(duration)s);""
        # without location/country table
        query = "INSERT INTO posts (title, content, itinerary, destination, country, user_id, date_from, date_to, duration) VALUES (%(title)s, %(content)s, %(itinerary)s, %(location)s, %(country)s, %(user_id)s, %(date_from)s, %(date_to)s, %(duration)s);"
        return connectToMySQL(cls.db_name).query_db(query, data)

    #.. update methods
    @classmethod
    def update_post(cls, data):
        # with location/country table
        # query = "UPDATE posts SET title = %(title)s, content = %(content)s, itinerary = %(itinerary)s, destination_id = %(destination_id)s, date_from = %(date_from)s, date_to = %(date_to)s, duration = %(duration)s WHERE id = %(id)s;""
        # without location/country table
        query = "UPDATE posts SET title = %(title)s, content = %(content)s, itinerary = %(itinerary)s, destination = %(destination)s, country = %(country)s, date_from = %(date_from)s, date_to = %(date_to)s, duration = %(duration)s WHERE id = %(id)s;"
        connectToMySQL(cls.db_name).query_db(query, data)
        return cls

    #.. delete methods
    @classmethod
    def delete_post(cls, data):
        query = "DELETE FROM posts WHERE id = %(id)s;"
        connectToMySQL(cls.db_name).query_db(query, data)
        return cls


    #.. validation methods
    @staticmethod
    def validate_post(data):
        validation = {
            "is_valid": True,
            "error": dict()
        }
        #title (not required)
        #content (not required)
        #itinerary
        if len(data['itinerary']) <= 0:
            validation['is_valid'] = False
            validation['error']['itinerary'] = "Itinerary is required"
        #country
        if len(data['country']) <= 0:
            validation['is_valid'] = False
            validation['error']['country'] = "Country is required"
        elif len(data['location']) <= 0: 
            validation['location'] = data['country']
        #destination
        if len(data['title']) <= 0: 
            validation['title'] = f"Trip to {validation['location'] if 'location' in validation else data['location']}"
        #dateFrom && dateTo
        if len(data['dateFrom']) < 10 or len(data['dateTo']) < 10:
            validation['is_valid'] = False
            validation['error']['dateFrom'] = "Travel dates are required"
        else:
            validation['duration'] = datetime.strptime(data['dateTo'], DATE_FORMAT)-datetime.strptime(data['dateFrom'], DATE_FORMAT) + timedelta(days=1)
            if validation['duration'] < timedelta(days=1):
                validation['is_valid'] = False
                validation['error']['dateTo'] = 'End date should not be earlier than start date'
        
        return validation