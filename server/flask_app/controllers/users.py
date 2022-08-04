from flask import jsonify, request
from flask_bcrypt import Bcrypt
from flask_app import app
from flask_app.models import user
bcrypt = Bcrypt(app)


#.. GET routes
@app.route('/api/users/posts/<int:id_num>', methods=['GET'])
def user_account_with_posts(id_num):
    data = {
        "id": id_num
    }
    print("------------- data in controller: ", data)
    user_info = user.User.get_user_with_posts_bookmarks(data)
    return jsonify(user_info)

@app.route('/api/users/id/<int:id_num>', methods=['GET'])
def user_account_by_id(id_num):
    data = {
        "id": id_num
    }
    print("------------- data in controller: ", data)
    user_info = user.User.get_user_by_id(data)
    return jsonify(user_info)

#.. POST routes
@app.route('/api/users/login', methods=['GET'])
def user_login():
    dataJSON = request.get_json()
    # print("=============================================   dataJSON: ", dataJSON)
    data = {
        "email": dataJSON['email'],
    }
    user_info = user.User.get_user_by_email(data)
    if not user_info or not bcrypt.check_password_hash(user_info.password, dataJSON['password']):
        return jsonify({"user": "invalid", "status": "invalid login"})


    return jsonify({"user": user_info, "status": "login success"})

@app.route('/api/users', methods=['POST'])
def user_create():
    dataJSON = request.get_json()
    # print("=============================================   dataJSON: ", dataJSON)
    pw_hash = bcrypt.generate_password_hash(dataJSON['password'])
    data = {
        "username": dataJSON['username'],
        "first_name": dataJSON['firstName'],
        "last_name": dataJSON['lastName'],
        "email": dataJSON['email'],
        "password": pw_hash,
    }
    print("--------- data: ", data, "----------------")
    user.User.add_user(data)
    return jsonify({"message": "user created"})