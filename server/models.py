from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db
from config import flask_bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    # _password_hash = db.Column(db.String, nullable=True)
    _password_hash = db.Column("password_hash", db.String)

    @hybrid_property
    def password(self):
        raise AttributeError('Passwords are private, set-only')

    @password.setter
    def password(self, password_to_validate):
        if not isinstance(password_to_validate, str):
            raise TypeError('Password must be a string')
        if len(password_to_validate) < 8:
            raise ValueError('Password must be at least 8 characters long')
        hashed_password = flask_bcrypt.generate_password_hash(password_to_validate).decode("utf-8")
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)

    books = db.relationship('Book', back_populates='user')

    serialize_rules = ('-books', '-password_hash')

    def __repr__(self):
        return f'User {self.id}: {self.username}, {self.email}'

class Bookstore(db.Model, SerializerMixin):
    __tablename__ = "bookstores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    
    # breakpoint()
    books = db.relationship('Book', back_populates='bookstore')

    serialize_rules = ('-books',)

    def __repr__(self):
        return f'Bookstores: {self.id}: {self.name}, {self.address}, {self.phone_number}'



class Author(db.Model, SerializerMixin):
    __tablename__ = 'authors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    

    books = db.relationship('Book', back_populates='author')
    

    serialize_rules = ('-books',)

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

    serialize_rules = ('-user.books', '-bookstore.books', '-author.books')

    def __repr__(self):
        return f'Book {self.id}: User: {self.user_id}, Bookstore: {self.bookstore_id}, Author: {self.author_id}'
