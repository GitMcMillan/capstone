from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db
from extensions import bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=True)

    @hybrid_property
    def password_hash(self):
      return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        hashed = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = hashed.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    libraries = db.relationship('Library', back_populates='user')

    serialize_rules = ('-libraries',)

    def __repr__(self):
        return f'User {self.id}: {self.username}, {self.email}'

class Tag(db.Model, SerializerMixin):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String, nullable=False)
    best_seller = db.Column(db.Boolean, nullable=False)
    fiction = db.Column(db.Boolean, nullable=False)
    award_winner = db.Column(db.Boolean, nullable=False)
    new_release = db.Column(db.Boolean, nullable=False)

    books = db.relationship('Book', secondary='book_tags', back_populates='tags')

    def __repr__(self):
        return f'Tags: {self.id}: {self.genre}, {self.best_seller}, {self.fiction}, {self.award_winner}, {self.new_release}'

book_tags = db.Table(
    'book_tags',
    db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    page_number = db.Column(db.Integer, nullable=False)

    libraries = db.relationship('Library', back_populates='book')
    tags = db.relationship('Tag', secondary='book_tags', back_populates='books')

    serialize_rules = ('-libraries', '-tags')

    def __repr__(self):
        return f'Book: {self.id}:{self.title}, {self.author}, {self.page_number}'

class Library(db.Model, SerializerMixin):
    __tablename__ = "libraries"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    user = db.relationship('User', back_populates='libraries')
    book = db.relationship('Book', back_populates='libraries')

    serialize_rules = ('-user.libraries', '-book.libraries')

    def __repr__(self):
        return f'Library {self.id}: User {self.user_id}, Book {self.book_id}'
