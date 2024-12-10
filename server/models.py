from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db

# Models go here!

class User(db.Model, SerializerMixin):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)

  libraries = db.relationship('Library', back_populates='user')

  serialize_rules = ('-libraries',)

  def __repr__(self):
    return f'User {self.id}: {self.username}, {self.email}'

class Tag(db.Model, SerializerMixin):
  __tablename__  = "tags"

  id = db.Column(db.Integer, primary_key=True)
  genre = db.Column(db.String, nullable=False)
  best_seller = db.Column(db.Boolean, nullable=False)
  fiction = db.Column(db.Boolean, nullable=False)
  award_winner = db.Column(db.Boolean, nullable=False)
  new_release = db.Column(db.Boolean, nullable=False)

  

  def __repr__(self):
    return f'Tags: {self.id}: {self.genre}, {self.best_seller}, {self.fiction}, {self.award_winner}, {self.new_release}'


class Book(db.Model, SerializerMixin):
  __tablename__ = 'books'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  author = db.Column(db.String, nullable=False)
  page_number = db.Column(db.Integer, nullable=False)

  libraries = db.relationship('Library', back_populates='book')

  serialize_rules = ('-libraries',)

  

  def __repr__(self):
    return f'Book: {self.id}:{self.title}, {self.author}, {self.page_number}'
  

class Library(db.Model, SerializerMixin):
  __tablename__ = "libraries"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.String, db.ForeignKey('users.id'))
  book_id = db.Column(db.String, db.ForeignKey('books.id'))

  user = db.relationship('User', back_populates='libraries')
  book = db.relationship('Book', back_populates='libraries')

  serialize_rules = ('-user.libraries', '-book.libraries')

  def __repr__(self):
        return f'Library {self.id}: User {self.user_id}, Book {self.book_id}'



