from flask import jsonify, request
from flask_app import app
from flask_app.models import post

from flask_app.decorators import jwt_required


#.. GET routes
@app.route('/api/posts', methods=['GET'])
def post_all():
    posts_info = post.Post.get_all_posts()
    return jsonify(posts_info)

@app.route('/api/posts/<int:id>', methods=['GET'])
def post_detail(id):
    data = {
        "id": id
    }
    post_info = post.Post.get_post(data)
    return jsonify(post_info)

#.. POST routes

@app.route('/api/posts', methods=['POST'])
@jwt_required
def post_create():
    dataJSON = request.get_json()
    # print("========================   dataJSON: ", dataJSON)

    # validation
    validation = post.Post.validate_post(dataJSON)
    if not validation['is_valid']:
        return validation['error'], 400

    # continue if validation passed
    data = {
        "title": validation['title'] if 'title' in validation else dataJSON['title'],
        "content": dataJSON['content'],
        "itinerary": dataJSON['itinerary'],
        "destination": dataJSON['destination'],
        "country": dataJSON['country'],
        "date_from": dataJSON['dateFrom'],
        "date_to": dataJSON['dateTo'],
        "duration": validation['duration'].days,
        "user_id": dataJSON['user_id']
    }
    post.Post.add_post(data)
    # print("--------- data: ", data, "----------------")
    return jsonify({"message": "post created"})

#.. PUT routes
@app.route('/api/posts/<int:id>', methods=['PUT'])
@jwt_required
def post_edit(id):
    dataJSON = request.get_json()
    # print("========================   dataJSON: ", dataJSON)

        # validation
    validation = post.Post.validate_post(dataJSON)
    if not validation['is_valid']:
        return validation['error'], 400
    
    data = {
        "id": id,
        "title": validation['title'] if 'title' in validation else dataJSON['title'],
        "content": dataJSON['content'],
        "itinerary": dataJSON['itinerary'],
        "destination": dataJSON['destination'],
        "country": dataJSON['country'],
        "date_from": dataJSON['dateFrom'],
        "date_to": dataJSON['dateTo'],
        "duration": validation['duration'].days,
    }
    # print("---------data: ", data, "----------------")
    post.Post.update_post(data)
    return jsonify({"message": "post updated", "id": id, "dataJSON": dataJSON})

#.. DELETE routes
@app.route('/api/posts/<int:id>', methods=['DELETE'])
def post_delete(id):
    data ={
        "id": id,
    }
    post.Post.delete_post(data)
    return jsonify({"message": "post delete"})