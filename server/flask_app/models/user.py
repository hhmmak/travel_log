from flask_app.config.mysqlconnection import connectToMySQL

class User:

    db_name = 'travel_schema'

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
        results = connectToMySQL(cls.db_name).query_db(query, data)
        user = {
            "id": results[0]['id'],
            "username": results[0]['username'],
            "email": results[0]['email'],
            "password": results[0]['password'],
        }
        return user
    
    @classmethod
    def get_user_by_id(cls, data):
        print("------------- data in model: ", data)
        query = "SELECT * FROM users WHERE id = %(id)s;"
        results = connectToMySQL(cls.db_name).query_db(query, data)
        user = {
            "username": results[0]['username'],
            "first_name": results[0]['first_name'],
            "last_name": results[0]['last_name'],
            "email": results[0]['email'],
        }
        return user

    @classmethod
    def get_user_with_posts_bookmarks(cls,data):
        # obtain user with posts
        query = "SELECT * FROM users LEFT JOIN posts ON users.id = posts.user_id WHERE users.id = %(id)s;"
        results = connectToMySQL(cls.db_name).query_db(query, data)

        user = {
            "username": results[0]['username'],
            "first_name": results[0]['first_name'],
            "last_name": results[0]['last_name'],
            "email": results[0]['email'],
            "posts": [],
            "bookmarks": []
        }

        # add post to posts array
        for row in results:
            post = {
                "title": row['title'],
                "date_from": row['date_from'],
                "date_to": row['date_to'],
                "duration": row['duration'],
                "destination": f"{row['destination']}, {row['country']}"
            }
            user['posts'].append(post)

        #obtain bookmarks with users.id
        query = "SELECT * FROM bookmarks LEFT JOIN posts ON bookmarks.post_id = posts.id WHERE users.id = %(id)s;"
        result = connectToMySQL(cls.db_name).query_db(query, data)

        # add bookmarked posts to bookmarks array
        if result:
            for row in result:
                bookmark = {
                    "title": row['title'],
                    "duration": row['duration'],
                    "destination": row['destination']
                }
                user['bookmarks'].append(bookmark)
        
        return user


    #.. add methods
    @classmethod
    def add_user(cls, data):
        query = "INSERT INTO users (username, first_name, last_name, email, password) VALUES (%(username)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s);"
        return connectToMySQL(cls.db_name).query_db(query, data)

    #.. validation methods

