#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User
from flask_cors import CORS


# Views go here!



@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def get(self):
        users = User.query.all()

        return [user.to_dict() for user in users], 200
    
api.add_resource(Users, '/users')

class Tags(Resource):
    def get(self):
        tags = User.query.all()

        return [tag.to_dict() for tag in tags], 200
    
api.add_resource(Tags, '/tags')






if __name__ == '__main__':
        app.run(port=5555, debug=True)

