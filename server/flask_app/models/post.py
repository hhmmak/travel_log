from flask_app.config.mysqlconnection import connectToMySQL

class Post:

    db_name = 'travel_log_schema'

    def __init__(self, data):
        self.id = data['id']
        self.title = data['title']
        self.content = data['content']
        self.itinerary = data['itinerary']
        self.destination = f"{data['location']}, {data['country']}"
        self.user_id = data['user_id']
        self.user_username = data['username']
        self.date_from = data['date_from']
        self.date_to = data['date_to']
        self.duration = data['duration']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    #.. get methods
    @classmethod
    def get_all_posts(cls, data):
        query = "SELECT * FROM users LEFT JOIN posts ON users.id = posts.user_id LEFT JOIN locations ON posts.location_id = locations.id LEFT JOIN countries ON locations.country_id = countries.id"
        results = connectToMySQL(cls.db_name).query_db(query, data)
        posts = []
        for row in results:
            posts.append(cls(row))
        return posts

    
    @classmethod
    def get_post(cls, data):
        query = "SELECT * FROM users LEFT JOIN posts ON users.id = posts.user_id LEFT JOIN locations ON posts.location_id = locations.id LEFT JOIN countries ON locations.country_id = countries.id WHERE posts.id = %(id)s;"
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(results[0])


    #.. add methods
    @classmethod
    def add_post (cls,data):
        query = "INSERT INTO posts (title, content, itinerary, location_id, user_id, date_from, date_to, duration) VALUES (%(title)s, %(content)s, %(itinerary)s, %(location_id)s, %(user_id)s, %(date_from)s, %(date_to)s, %(duration)s);"
        return connectToMySQL(cls.db_name).query_db(query, data)

    #.. update methods
    @classmethod
    def update_post(cls, data):
        query = "UPDATE posts SET title = %(title)s, content = %(content)s, itinerary = %(itinerary)s, location_id = %(location_id)s, date_from = %(date_from)s, date_to = %(date_to)s, duration = %(duration)s WHERE id = %(id)s;"
        connectToMySQL(cls.db_name).query_db(query, data)
        return cls

    #.. delete methods
    @classmethod
    def delete_post(cls, data):
        query = "DELETE FROM posts WHERE id = %(id)s;"
        connectToMySQL(cls.db_name).query_db(query, data)
        return cls


    #.. validation methods

