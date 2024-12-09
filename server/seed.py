#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Book, Tag

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        #clear data
        db.session.query(User).delete()
        db.session.query(Book).delete()
        db.session.query(Tag).delete()
        # db.session.query(Library).delete()

        #seed users 
        
        #variable = Model(attr)
        #in _ range(number of instances)
        users = [
            User(
            username=fake.name(),
            email=fake.email()
        )
        for _ in range (10)
        ]

        #add and commit
        db.session.add_all(users)
        db.session.commit()

        #variable = Model(attr)
        #in _ range(number of instances)
        books = [
            Book(
            title=fake.sentence(nb_words=randint(2, 7)),
            author= fake.name(),
            page_number=fake.random_int(min=50, max=1000) 
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
        genres = ['Sci-Fi', 'Horror', 'Mystery', 'Romance', 'Adventure', 'Historical', 'Technical', 'Educational']

        tags = [
            Tag(
                genre=rc(genres), 
                best_seller=rc([True, False]),
                fiction=rc([True, False]),
                award_winner=rc([True, False]),
                new_release=rc([True, False]))
                for _ in range (100)
                ]
        db.session.add_all(tags)
        db.session.commit()



        print("Seed successful")
