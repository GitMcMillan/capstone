#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, request, session
from extensions import bcrypt
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Tag, Book, Library


bcrypt.init_app(app)




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
        tags = Tag.query.all()

        return [tag.to_dict() for tag in tags], 200
    
api.add_resource(Tags, '/tags')

class Books(Resource):
    def get(self):
        books = Book.query.all()

        return [book.to_dict() for book in books], 200
    
api.add_resource(Books, '/books')

class Libraries(Resource):
    def get(self):
        libraries = Library.query.all()

        return [library.to_dict() for library in libraries], 200
    
api.add_resource(Libraries, '/libraries')

app.secret_key = 'password'
class Login(Resource):
    def post(self):
        data = request.get_json()
        username= data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        
        return {'error' : 'Invalid username or password'}, 401
    
api.add_resource(Login, '/login')

class Logout(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user.to_dict(), 200
        return {}, 204
        
api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user.to_dict(), 200
        return {}, 201
    
api.add_resource(CheckSession, '/check_session')








if __name__ == '__main__':
        app.run(port=5555, debug=True)

