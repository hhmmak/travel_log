from flask import jsonify, request, make_response

from flask_app import app
from flask_app.models import user

#authentication related
from flask_bcrypt import Bcrypt
import jwt
from jwt.exceptions import ExpiredSignatureError
import os
import datetime

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

@app.route('/api/users', methods=['GET'])
def user_login_verification():
    jwt_key = os.environ.get("TOKEN_KEY")
    token = request.args.get('token')
    if not token:
        return jsonify({'message' : 'require valid token'}), 401

    try:
        decoded_jwt = jwt.decode(token, jwt_key, algorithms=["HS256"])
        print("------------- decoded_jwt: ", decoded_jwt)
    except ExpiredSignatureError as error:
        return jsonify({ 'message' : f'Unable to decode the token, error: {error}'}), 401
    return jsonify({'userId': decoded_jwt['userId']})


#.. POST routes
@app.route('/login', methods=['POST'])
def user_login():
    dataJSON = request.get_json()
    # print("=============================================   dataJSON: ", dataJSON)

    # validation login form input presence
    validation = user.User.validate_login_input(dataJSON)
    if not validation['is_valid']:
        return make_response(validation['error'], 400)

    data = {
        "email": dataJSON['email'],
    }
    user_info = user.User.get_user_by_email(data)
    # print("=============================================   user_info['password']: ", user_info['password'])

    # login not success
    if not user_info or not bcrypt.check_password_hash(user_info['password'], dataJSON['password']):
        return make_response('Login invalid', 401, {'Authentication': 'Login required'})

    # login success, return 
    payload = {
        "email": user_info['email'],
        "username": user_info['username'],
        "userId": user_info['id'],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    jwt_key = os.environ.get("TOKEN_KEY")
    token = jwt.encode(payload, key=jwt_key, algorithm="HS256")
    return jsonify({"token": token, "userId": user_info['id']})

@app.route('/api/users', methods=['POST'])
def user_create():
    dataJSON = request.get_json()
    # print("=====================   dataJSON: ", dataJSON)

    # validation
    validation = user.User.validate_create_account(dataJSON)
    # print("========== validation = ", validation, " ==================")
    if not validation['is_valid']:
        print("========== validation['error'] = ", validation['error'], " ==================")
        return jsonify(validation['error']), 400
    
    #continue if validation passed
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