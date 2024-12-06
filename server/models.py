from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db

# Models go here!

class User(db.Model, SerializerMixin):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)

# class Tag(db.Model, SerializerMixin):
#   pass

# class Book(db.Model, SerializerMixin):
#   pass

# class Library(db.Model, SerializerMixin):
#   pass



