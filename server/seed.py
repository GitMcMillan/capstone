#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        #clear data
        db.session.query(User).delete()

        #seed users 
        
        #variable = User(attr)
        #in _ range(number of instances)
        user = [
            User(
            username=fake.name(),
            email=fake.email()
        )
        for _ in range (10)
        ]

        #add and commit
        db.session.add_all(user)
        db.session.commit()

        print("Seed successful")
