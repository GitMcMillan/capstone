#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, request, session
from extensions import bcrypt
import ipdb
from flask_restful import Resource
from flask_bcrypt import Bcrypt

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Author, Book, Bookstore

# bcrypt = Bcrypt(app)
# bcrypt.init_app(app)




# Views go here!



@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def get(self):
        users = User.query.all()

        return [user.to_dict() for user in users], 200
    
api.add_resource(Users, '/users')

class Authors(Resource):
    def get(self):
        authors = Author.query.all()

        return [author.to_dict() for author in authors], 200
    
api.add_resource(Authors, '/authors')

class AuthorByID(Resource):
    def get(self, id):
        author = Author.query.get(id)
        if not author:
            return {"error": "Author not found"}, 404
        
        
        return {
            "id": author.id,
            "name": author.name,
            "books": [
                {
                    "id": book.id,
                    "title": book.title,
                    "genre": book.genre,
                    "page_number": book.page_number,
                    "bookstore": {
                        "id": book.bookstore.id,
                        "name": book.bookstore.name,
                        "address": book.bookstore.address,
                        "phone_number": book.bookstore.phone_number,
                    } if book.bookstore else None,
                    "user": {
                        "id": book.user.id,
                        "username": book.user.username,
                        "email": book.user.email,
                    } if book.user else None,
                }
                for book in author.books
            ],
        }, 200

api.add_resource(AuthorByID, '/authors/<int:id>')

class Bookstores(Resource):
    def get(self):
        bookstores = Bookstore.query.all()

        return [bookstore.to_dict() for bookstore in bookstores], 200
    
api.add_resource(Bookstores, '/bookstores')

class Books(Resource):
    def get(self):
        books = Book.query.all()

        return [book.to_dict() for book in books], 200
    
api.add_resource(Books, '/books')

class BookByID(Resource):
    def get(self, id):
        book = Book.query.get(id)
        if not book:
            return {"error": "Book not found"}, 404
        return book.to_dict(), 200

api.add_resource(BookByID, '/books/<int:id>')

#delete me
app.secret_key = 'password'
class Login(Resource):
    def post(self):
        try:
            data = request.json
            # Check for username or email
            user = User.query.filter(
                (User.username == data.get('username', "")) |
                (User.email == data.get('email', ""))
            ).first()
            if user and user.authenticate(data.get("password", "")):
                session['user_id'] = user.id
                return make_response({'message': f'Welcome Back, {user.username}'}, 200)
            else:
                return make_response({'error': 'Invalid credentials'}, 401)
        except Exception as e:
            return {'error': str(e)}, 400
    
api.add_resource(Login, '/login')


import ipdb
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

