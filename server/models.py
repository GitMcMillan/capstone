from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db

# Models go here!

class Test(db.Model, SerializerMixin):
  __tablename__ = "Test1"

  id = db.Column(db.Integer, primary_key=True)
  test_data = db.Column(db.String, default="test1")
  test_data2 = db.Column(db.String, default="test2")



