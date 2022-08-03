from flask_app.config.mysqlconnection import connectToMySQL

class Bookmark:

    db_name = 'travel_schema'

    #.. add methods
    @classmethod
    def add_bookmark(cls, data):
        query = "INSERT INTO favorites (user_id, post_id) VALUES (%(user_id)s, %(post_id)s);"
        return connectToMySQL(cls.db_name).query_db(query, data)
    

    #.. delete methods
    @classmethod
    def delete_bookmark(cls, data):
        query = "DELETE FROM bookmarks WHERE user_id = %(user_id)s AND post_id = %(post_id)s;"
        return cls