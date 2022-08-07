from flask import jsonify, request
from flask_app import app
from flask_app.models import bookmark
from flask_app.decorators import jwt_required

#.. POST route - get bookmark list
@app.route('/api/bookmarks/list', methods=['POST'])
@jwt_required
def bookmark_list_by_user():
    dataJSON = request.get_json()
    data ={
        "user_id": dataJSON['userId']
    }
    bookmark_list = bookmark.Bookmark.get_bookmarks_by_user(data)
    return jsonify(bookmark_list)

#.. POST route - add bookmark
@app.route('/api/bookmarks', methods=['POST'])
@jwt_required
def bookmark_create():
    dataJSON = request.get_json()
    data = {
        "user_id": dataJSON['userId'],
        "post_id": dataJSON['postId']
    }
    bookmark.Bookmark.add_bookmark(data)
    return ({"message": "bookmark added"}) 

#.. DELETE route - remove bookmark
@app.route('/api/bookmarks', methods=['DELETE'])
@jwt_required
def bookmark_delete():
    dataJSON = request.get_json()
    data = {
        "user_id": dataJSON['userId'],
        "post_id": dataJSON['postId']
    }
    bookmark.Bookmark.delete_bookmark(data)
    return jsonify({"message": "bookmark deleted"})