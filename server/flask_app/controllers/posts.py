from flask import jsonify, request
from flask_app import app

from flask_app.models import post
from flask_app.models import destination
from flask_app.models import location
from flask_app.models import city
from flask_app.models import country

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
    
    destinationJSON = {
        "location": validation['location'] if 'location' in validation else dataJSON['location'],
        "city": dataJSON['city'],
        "country": dataJSON['country']
    }

    destination_id = destination.Destination.get_destination(destinationJSON)
    if not destination_id:
        location_id = location.Location.get_location_by_name(destinationJSON)
        if not location_id:
            location_id = location.Location.add_location(destinationJSON)
        city_id = city.City.get_city_by_name(destinationJSON)
        if not city_id:
            city_id = city.City.add_city(destinationJSON)
        country_id = country.Country.get_country_by_name(destinationJSON)
        destination_id = destination.Destination.add_destination({
            "location_id": location_id,
            "city_id": city_id,
            "country_id": country_id,
        })

    # create data from dataJSON, validaiton and destination_id

    data = {
        "title": validation['title'] if 'title' in validation else dataJSON['title'],
        # "title": dataJSON['title'],   # api testing purpose
        "content": dataJSON['content'],
        "itinerary": dataJSON['itinerary'],
        "destination_id": destination_id,
        # "destination_id": dataJSON['destination_id'],   # api testing purpose
        "date_from": dataJSON['dateFrom'],
        "date_to": dataJSON['dateTo'],
        "duration": validation['duration'].days,
        # "duration":dataJSON['duration'],    # api testing purpose
        "user_id": dataJSON['user_id']
    }
    # print("--------- data: ", data, "----------------")

    result = post.Post.add_post(data)
    return jsonify({"message": "post created", "id": result})


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
    
    destinationJSON = {
        "location": validation['location'] if 'location' in validation else dataJSON['location'],
        "city": dataJSON['city'],
        "country": dataJSON['country']
    }

    destination_id = destination.Destination.get_destination(destinationJSON)
    if not destination_id:
        location_id = location.Location.get_location_by_name(destinationJSON)
        if not location_id:
            location_id = location.Location.add_location(destinationJSON)
        city_id = city.City.get_city_by_name(destinationJSON)
        if not city_id:
            city_id = city.City.add_city(destinationJSON)
        country_id = country.Country.get_country_by_name(destinationJSON)
        destination_id = destination.Destination.add_destination({
            "location_id": location_id,
            "city_id": city_id,
            "country_id": country_id,
        })

    # create data from dataJSON, validaiton and destination_id

    data = {
        "id": id,
        "title": validation['title'] if 'title' in validation else dataJSON['title'],
        # "title": dataJSON['title'],   # api testing purpose
        "content": dataJSON['content'],
        "itinerary": dataJSON['itinerary'],
        "destination_id": destination_id,
        # "destination_id": dataJSON['destination_id'],   # api testing purpose
        "date_from": dataJSON['dateFrom'],
        "date_to": dataJSON['dateTo'],
        "duration": validation['duration'].days,
        # "duration":dataJSON['duration'],    # api testing purpose
        "user_id": dataJSON['user_id']
    }
    # print("---------data: ", data, "----------------")
    
    post.Post.update_post(data)
    return jsonify({"message": "post updated", "id": id})

#.. DELETE routes
@app.route('/api/posts/<int:id>', methods=['DELETE'])
def post_delete(id):
    data ={
        "id": id,
    }
    post.Post.delete_post(data)
    return jsonify({"message": "post delete"})