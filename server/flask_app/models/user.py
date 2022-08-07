from flask_app.config.mysqlconnection import connectToMySQL
import re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
DATE_FORMAT = '%Y-%m-%d'

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
            "firstName": results[0]['first_name'],
            "lastName": results[0]['last_name'],
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
            "firstName": results[0]['first_name'],
            "lastName": results[0]['last_name'],
            "email": results[0]['email'],
            "posts": [],
            "bookmarks": []
        }

        # add post to posts array
        if results[0]['posts.id']:
            print("=========== have post")
            for row in results:
                post = {
                    "id": row['posts.id'],
                    "title": row['title'],
                    "dateFrom": row['date_from'].strftime(DATE_FORMAT),
                    "dateTo": row['date_to'].strftime(DATE_FORMAT),
                    "duration": row['duration'],
                    "destination": f"{row['destination']}, {row['country']}"
                }
                user['posts'].append(post)

        #obtain bookmarks with users.id
        query = "SELECT * FROM bookmarks LEFT JOIN posts ON bookmarks.post_id = posts.id WHERE bookmarks.user_id = %(id)s;"
        result = connectToMySQL(cls.db_name).query_db(query, data)
        print("=============bookmark result: ", result)
        # add bookmarked posts to bookmarks array
        if result:
            print("=========== have bookmark")
            for row in result:
                bookmark = {
                    "id": row['posts.id'],
                    "title": row['title'],
                    "duration": row['duration'],
                    "destination": row['destination']
                }
                user['bookmarks'].append(bookmark)
        
        print("user: ", user)
        return user


    #.. add methods
    @classmethod
    def add_user(cls, data):
        query = "INSERT INTO users (username, first_name, last_name, email, password) VALUES (%(username)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s);"
        return connectToMySQL(cls.db_name).query_db(query, data)

    #.. validation methods
    @staticmethod
    def validate_create_account(data):
        validation = {
            "is_valid": True,
            "error": dict()
        }
        #username
        if 'username' not in data:
            validation['is_valid'] = False
            validation['error']['username'] = "Username is required"
        #first name
        if 'firstName' not in data:
            validation['is_valid'] = False
            validation['error']['firstName'] = "First name is required"
        # #last name
        if 'lastName' not in data:
            validation['is_valid'] = False
            validation['error']['lastName'] = "Last name is required"
        # #email
        if 'email' not in data:
            validation['is_valid'] = False
            validation['error']['email'] = "Email is required"
        elif not EMAIL_REGEX.match(data['email']):
            validation['is_valid'] = False
            validation['error']['email'] = "Email format not valid"
        # #password
        if 'password' not in data or len(data['password']) < 6:
            validation['is_valid'] = False
            validation['error']['password'] = "Password must have 6 characters"
        elif 'confirmPassword' not in data or data['password'] != data['confirmPassword']:
            validation['is_valid'] = False
            validation['error']['confirmPassword'] = "Passwords do not match"

    

        return validation

    @staticmethod
    def validate_login_input(data):
        validation = {
            "is_valid": True,
            "error": None
        }

        if 'email' not in data or 'password' not in data:
            validation['is_valid'] = False
            validation['error'] = "Login Invalid"

        return validation
