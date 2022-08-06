from flask import jsonify, request
from functools import wraps
import os
import jwt
from jwt.exceptions import ExpiredSignatureError

def jwt_required(function):
    @wraps(function)
    def wrap(*args, **kwargs):

        jwt_key = os.environ.get("TOKEN_KEY")
        token = request.args.get('token')
        
        if not token:
            return jsonify({'message' : 'require valid token'}), 401

        try:
            decoded_jwt = jwt.decode(token, jwt_key, algorithms=["HS256"])
        except ExpiredSignatureError as error:
            return jsonify({ 'message' : f'Unable to decode the token, error: {error}'}), 401

        return function(*args, **kwargs)
    return wrap