from flask import jsonify
from flask_app import app
from flask_app.models import post

#.. GET routes
@app.route('/api/posts/<int:id>')
def post_detail(id):
    data = {
        "id": id
    }
    post_info = post.Post.get_post(data)
    return jsonify(post_info)

#.. POST routes

#.. PUT routes

#.. DELETE routes