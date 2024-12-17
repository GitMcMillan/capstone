from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db
from config import flask_bcrypt
from sqlalchemy.orm import validates

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    # _password_hash = db.Column(db.String, nullable=True)
    _password_hash = db.Column("password_hash", db.String)

    @validates('username', 'email')
    def validation_name(self, key, value):
        if not value:
            raise ValueError(f"{key} must be provided and cannot be empty.")
        return value


    @hybrid_property
    def password(self):
        raise AttributeError('Passwords are private, set-only')

    @password.setter
    def password(self, password_to_validate):
        if not isinstance(password_to_validate, str):
            raise TypeError('Password must be a string')
        if not 8 < len(password_to_validate)  < 20:
            raise ValueError('Password must be at between 8 and 20 characters long')
        hashed_password = flask_bcrypt.generate_password_hash(password_to_validate).decode("utf-8")
        self._password_hash = hashed_password


    def authenticate(self, password_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)

    books = db.relationship('Book', back_populates='user')
    authors = association_proxy('books', 'author')

    serialize_rules = ('-books', '-password_hash')
    @validates("name")
    

    def __repr__(self):
        return f'User {self.id}: {self.username}, {self.email}'

class Bookstore(db.Model, SerializerMixin):
    __tablename__ = "bookstores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)

    @validates('name', 'address')
    def validate_name_address(self, key, value):
        if not isinstance(value,str):
            raise ValueError(f'{key} must be non empty string')
        return value
    
    @validates('phone_number')
    def validate_phone_number(self, key, value):
        if not isinstance(value, int) or len(str(value)) > 10 or len(str(value)) > 15:
            raise ValueError("Phone number must be integer between 10 and 15 digits")
        return value
    
    # breakpoint()
    books = db.relationship('Book', back_populates='bookstore')
    
    
    

    serialize_rules = ('-books', "-books.bookstore")

    def __repr__(self):
        return f'Bookstores: {self.id}: {self.name}, {self.address}, {self.phone_number}'



class Author(db.Model, SerializerMixin):
    __tablename__ = 'authors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    

    books = db.relationship('Book', back_populates='author')
    
    

    @validates('name')
    def validate_name_address(self, key, value):
        if not isinstance(value,str):
            raise ValueError(f'{key} must be non empty string')
        return value
    

    serialize_rules = ('-books.author', '-bookstores', '-users')

    def __repr__(self):
        return f'Author: {self.id}:{self.name}'

class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    page_number = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bookstore_id = db.Column(db.Integer, db.ForeignKey('bookstores.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'))

    user = db.relationship('User', back_populates='books')
    author = db.relationship('Author', back_populates='books')
    bookstore = db.relationship('Bookstore', back_populates='books')

    @validates('title', 'genre')
    def validate_title_genre(self, key, value):
        if not isinstance(value, str):
            raise ValueError(f'{key} must be a non empty string')
        return value
    
    @validates('page number')
    def validate_page_number(self, key, value):
        if not isinstance(value, int) or value <= 50:
            raise ValueError('Page number must be an integer greater than 50')
        return value
    
    @validates('user_id', 'bookstore_id', 'author_id')
    def validate_foreign_keys(self, key, value):
        if not isinstance(value, int) or value <= 0:
            raise ValueError(f"{key} must be a positive integer.")
        return value

    serialize_rules = ('-user.books', '-bookstore.books', '-author.books')

    def __repr__(self):
        return f'Book {self.id}: User: {self.user_id}, Bookstore: {self.bookstore_id}, Author: {self.author_id}'
