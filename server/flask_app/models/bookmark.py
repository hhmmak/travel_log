from flask_app.config.mysqlconnection import connectToMySQL

class Bookmark:

    db_name = 'travel_schema'

    @classmethod
    def get_bookmarks_by_user(cls, data):
        query = "SELECT * FROM bookmarks WHERE bookmarks.user_id = %(user_id)s;"
        results = connectToMySQL(cls.db_name).query_db(query, data)
        bookmarks = []
        if results:
            for row in results:
                bookmarks.append(row['post_id'])
        return bookmarks
    
    #.. add methods
    @classmethod
    def add_bookmark(cls, data):
        query = "INSERT INTO bookmarks (user_id, post_id) VALUES (%(user_id)s, %(post_id)s);"
        return connectToMySQL(cls.db_name).query_db(query, data)
    

    #.. delete methods
    @classmethod
    def delete_bookmark(cls, data):
        query = "DELETE FROM bookmarks WHERE user_id = %(user_id)s AND post_id = %(post_id)s;"
        return connectToMySQL(cls.db_name).query_db(query, data)