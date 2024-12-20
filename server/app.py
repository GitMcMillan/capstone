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

from flask_cors import CORS
# Add your model imports
from models import User, Author, Book, Bookstore

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])





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
    
    def post(self):
        data = request.get_json()
        name = data.get("name")
        if not name:
            return {"error": "Name is required"}, 400

        new_author = Author(name=name)
        db.session.add(new_author)
        db.session.commit()
        return new_author.to_dict(), 201


    
api.add_resource(Authors, '/authors')

class AuthorByID(Resource):
    def get(self, id):
        author = Author.query.filter_by(id=id).first()
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
    
    def delete(self, id):
        author = Author.query.filter_by(id=id).first()

        if not author:
            return {"error": "Author not found"}, 404

        db.session.dbdelete(author)
        db.session.commit()

        return "", 204

    def patch(self, id):
        data = request.get_json()
        author = Author.query.filter_by(id=id).first()
        #title author genre pages bookstore

        if 'name' in data:
            author.name = data['name']
        

        db.session.commit()
        return author.to_dict(), 200




api.add_resource(AuthorByID, '/authors/<int:id>')

class Bookstores(Resource):
    def get(self):
        bookstores = Bookstore.query.all()

        return [bookstore.to_dict() for bookstore in bookstores], 200
    
    def post(self):
        try:
            data = request.get_json()
            new_bookstore = Bookstore(
                name=data.get("name"),
                address=data.get("address"),
                phone_number=data.get("phone_number")
            )
            db.session.add(new_bookstore)
            db.session.commit()
            return new_bookstore.to_dict(), 201
        except Exception as e:
            print(f"Error: {e}")
            return {"error": "Internal Server Error"}, 500
    
    
    
    
    
api.add_resource(Bookstores, '/bookstores')

class Books(Resource):
    def get(self):
        books = Book.query.all()

        return [book.to_dict() for book in books], 200
    
    def post(self):
        data = request.json
        author_name = data.get('author')
        bookstore_id = data.get('bookstore_id') 
        author = None
        if author_name:
            author = Author.query.filter_by(name=author_name).first()
            if not author:
                author = Author(name=author_name)
                db.session.add(author)

        bookstore = None
        if bookstore_id:
            bookstore = Bookstore.query.get(bookstore_id)  

        new_book = Book(
            title=data.get('title'),
            genre=data.get('genre'),
            page_number=data.get('page_number'),
            author=author,
            bookstore=bookstore,
            user_id=1  
        )

        db.session.add(new_book)
        db.session.commit()
        return new_book.to_dict(), 201
    
api.add_resource(Books, '/books')

class BookByID(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            return {"error": "Book not found"}, 404
        return book.to_dict(), 200



    def delete(self, id):
        book = Book.query.filter_by(id=id).first()

        if not book:
            return {"error": "Book not found"}, 404

        db.session.delete(book)
        db.session.commit()

        return "", 204

    def patch(self, id):
        data = request.get_json()
    
        
        book = Book.query.filter_by(id=id).first()
        if not book:
            return {"error": "Book not found"}, 404

        
        if 'title' in data:
            book.title = data['title']

        if 'genre' in data:
            book.genre = data['genre']

        if 'page_number' in data:
            book.page_number = data['page_number']

        if 'author' in data:
            new_author_name = data['author']
            if book.author:
                book.author.name = new_author_name
            else:
                return {'error': "No author for this book"}, 404


        
        db.session.commit()

        
        return book.to_dict(), 200


api.add_resource(BookByID, '/books/<int:id>')


app.secret_key = 'password'
class Login(Resource):
    def post(self):
        # Stephen
        form_json = request.get_json()
        username = form_json["username"]
        password = form_json["password"]
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            print("Session set:", session)
            return user.to_dict(), 200
        else:
            print("Invalid credentials")
            return "Invalid Credentials", 401




       
    
api.add_resource(Login, '/login')


# import ipdb

# 

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            print(session['user_id'])
        return make_response({}, 204)
api.add_resource(Logout, '/logout')
# class Logout(Resource):
#     def delete(self):
#         session.clear()  
#         return {}, 204
        
       
        
# api.add_resource(Logout, '/logout')

class CheckSession(Resource):
   

    
    def get(self):
        user_id = session.get('user_id')
        print("User ID in session:", user_id)
        if user_id:
            user = User.query.get(user_id)
            print("User found:", user)
            if user:
                return user.to_dict(), 200
        return {}, 401
    
api.add_resource(CheckSession, '/check_session')

class Signup(Resource):
    def post(self):
        form_json = request.get_json()
        username = form_json.get("username")
        email = form_json.get("email")
        password = form_json.get("password")

        # Check if all required fields are provided
        if not username or not email or not password:
            return make_response({"error": "All fields are required: username, email, password"}, 400)

        # Check if the username or email already exists
        if User.query.filter_by(username=username).first():
            return make_response({"error": "Username already taken"}, 400)
        if User.query.filter_by(email=email).first():
            return make_response({"error": "Email already registered"}, 400)

        try:
            new_user = User(username=username, email=email)
            new_user.password = password  # Use password setter for hashing
            db.session.add(new_user)
            db.session.commit()

            # Automatically sign in the new user
            session["user_id"] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
        
api.add_resource(Signup, '/signup')

# @app.before_request
# def check_session():
#     print(session)
#     if session.get("user_id") is None:
#         session["user_id"] = None
#     else:
#         print("User is logged in")
#         print(session["user_id"])     








if __name__ == '__main__':
        app.run(port=5555, debug=True)