from flask_app.config.mysqlconnection import connectToMySQL

class User:

    db_name = 'travel_log_schema'

    def __init__(self, data):
        self.id = data['id']
        self.username = data['username']
        self.first_name = data ['first_name']
        self.last_name = data ['last_name']
        self.email = data ['email']
        self.password = data ['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.posts = []
        self.bookmarks = []

    #.. get methods
    @classmethod
    def get_user_by_email(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        user = connectToMySQL(cls.db).query_db(query, data)
        return cls(user[0])
    
    def get_user_by_id(cls, data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        user = connectToMySQL(cls.db).query_db(query, data)
        return cls(user[0])

    def get_user_with_posts_bookmarks(cls,data):
        # obtain user with posts
        query = "SELECT * FROM users LEFT JOIN posts ON users.id = posts.user_id LEFT JOIN locations ON posts.location_id = locations.id LEFT JOIN countries ON locations.country_id = countries.id WHERE users.id = %(id)s;"
        result = connectToMySQL(cls.db).query_db(query, data)
        user = cls(result[0])

        # add post to posts array
        for row in result:
            post = {
                "title": row['title'],
                "date_from": row['date_from'],
                "date_to": row['date_to'],
                "duration": row['duration'],
                "destination": f"{row['location'], row['country']}"
            }
            user.posts.append(post)

        #obtain bookmarks with users.id
        query = "SELECT * FROM bookmarks LEFT JOIN posts ON bookmarks.post_id = posts.id LEFT JOIN locations ON posts.location_id = locations.id WHERE users.id = %(id)s;"
        result = connectToMySQL(cls.db).query_db(query, data)

        # add bookmarked posts to bookmarks array
        for row in result:
            bookmark = {
                "title": row['title'],
                "duration": row['duration'],
                "location": row['location']
            }
            user.bookmarks.append(bookmark)
        
        return user


    #.. add methods
    @classmethod
    def add_user(cls, data):
        query = "INSERT INTO users (username, first_name, last_name, email, password) VALUES (%(name)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s);"
        return connectToMySQL(cls.db).query_db(query, data)
    
    @classmethod
    def add_bookmark(cls, data):
        query = "INSERT INTO favorites (user_id, post_id) VALUES (%(user_id)s, %(post_id)s);"
        return connectToMySQL(cls.db).query_db(query, data)
    

    #.. delete methods
    @classmethod
    def delete_bookmark(cls, data):
        query = "DELETE FROM bookmarks WHERE user_id = %(user_id)s AND post_id = %(post_id)s;"
        return cls



    #.. validation methods
