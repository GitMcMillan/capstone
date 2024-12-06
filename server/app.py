#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Test
from flask_cors import CORS


# Views go here!



@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class TestPage(Resource):
    def get(self):
        tests = Test.query.all()

        return [test.to_dict() for test in tests]
    
api.add_resource(TestPage, '/test')






if __name__ == '__main__':
        app.run(port=5555, debug=True)

