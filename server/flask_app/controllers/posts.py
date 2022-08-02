from flask import jsonify, request, json
from flask_bcrypt import Bcrypt
from flask_app import app
from flask_app.models import post
from datetime import datetime

#.. GET routes
@app.route('/api/posts/<int:id>')
def post_detail(id):
    data = {
        "id": id
    }
    post_info = post.Post.get_post(data)
    return jsonify(post_info)

#.. POST routes
@app.route('/api/posts', methods=['POST'])
def user_create():
    dataJSON = request.get_json()
    print("=============================================   dataJSON: ", dataJSON)
    duration = datetime.strptime(dataJSON['dateTo'], '%Y-%m-%d')-datetime.strptime(dataJSON['dateFrom'], '%Y-%m-%d')
    data = {
        "title": dataJSON['title'],
        "content": dataJSON['content'],
        "itinerary": dataJSON['itinerary'],
        "destination": dataJSON['destination'],
        "country": dataJSON['country'],
        "date_from": dataJSON['dateFrom'],
        "date_to": dataJSON['dateTo'],
        "duration": duration.days + 1,
        "user_id": dataJSON['user_id']
    }
    post.Post.add_post(data)
    print("---------data: ", data, "----------------")
    return jsonify({"message": "post created"})

#.. PUT routes

#.. DELETE routes