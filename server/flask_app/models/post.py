from flask_app.config.mysqlconnection import connectToMySQL

class Post:

    db_name = 'travel_log_schema'

    def __init__(self, data):
        self.id = data['id']
        self.title = data['title']
        self.content = data ['content']
        self.itinerary = data ['itinerary']
        self.location = data ['location']
        self.user_id = data ['user_id']
        self.date_from = data ['date_from']
        self.date_to = data ['date_to']
        self.duration_id = data ['duration_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    #.. get methods


    #.. add methods


    #.. validation methods

