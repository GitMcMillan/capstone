#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Book, Author, Bookstore

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        #clear data
        db.session.query(User).delete()
        db.session.query(Author).delete()
        db.session.query(Bookstore).delete()
        db.session.query(Book).delete()

        #seed users 
        
        #variable = Model(attr)
        #in _ range(number of instances)
        users = [
            User(
            username='Bob',
            email='bob@bob.bob'
        )]

        #add and commit
        db.session.add_all(users)
        db.session.commit()

        single_user = users[0]

        authors = [
            Author(
                name=fake.name(), 
                )
                for _ in range (20)
                ]
        db.session.add_all(authors)
        db.session.commit()

        bookstores = [
            Bookstore(
            name=fake.company(),
            address=fake.address(),
            phone_number=fake.phone_number()  
            )
            for _ in range(10) 
            ]
        
        db.session.add_all(bookstores)
        db.session.commit()

        genres = ['Sci-Fi', 'Horror', 'Mystery', 'Romance', 'Adventure', 'Historical', 'Technical', 'Educational']
        #variable = Model(attr)
        #in _ range(number of instances)
        books = [
            Book(
            title=fake.sentence(nb_words=randint(2, 7)),
            page_number=fake.random_int(min=50, max=1000), 
            author_id=rc([author.id for author in authors]),
            user_id=single_user.id,
            bookstore_id=rc([bookstore.id for bookstore in bookstores]),
            genre=rc(genres)
        )
        for _ in range (100)
        ]
        db.session.add_all(books)
        db.session.commit()

        #variable = [
        # Model(
        # attr,
        # (attr),
        # (etc),)]
        #in _ range(number of instances)
        

        

        



        print("Seed successful")
