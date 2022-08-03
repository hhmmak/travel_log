from flask import jsonify, request
from flask_app import app
from flask_app.models import bookmark

#.. POST route - add bookmark
@app.route('/api/bookmarks', methods=['POST'])
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
def bookmark_delete():
    dataJSON = request.get_json()
    data = {
        "user_id": dataJSON['userId'],
        "post_id": dataJSON['postId']
    }
    bookmark.Bookmark.delete_bookmark(data)
    return jsonify({"message": "bookmark deleted"})