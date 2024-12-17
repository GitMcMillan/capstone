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

CORS(app)
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
        try:
            #get data thru request context
            data = request.json
            #chcek that you can find user by email AND password matches
            user = User.query.filter_by(email=data.get('email', "")).first()
            if user and user.authenticate(data.get("password","")):
                session["user_id"] = user.id #how we log in
                print("Session after login:", session)
                return make_response(user.to_dict(), 200)
            else:
                return make_response("Invalid Credentials", 401) 
        except Exception as e:
            return {'error': str(e)}, 400
    
api.add_resource(Login, '/login')


import ipdb
class Logout(Resource):
    def delete(self):
        try:
        
            response = make_response({}, 204)

            if "user_id" in session:
                del session["user_id"]
                response.delete_cookie("session")
                return response
        except Exception as e:
            return {"Error": str(e)}, 422
        
api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        print("User ID in session:", user_id)
        if user_id:
            user = User.query.get(user_id)
            print("User found:", user)
            if user:
                return user.to_dict(), 200
        return {}, 201
    
api.add_resource(CheckSession, '/check_session')








if __name__ == '__main__':
        app.run(port=5555, debug=True)