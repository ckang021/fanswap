from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# def seed_users():
#     demo = User(
#         username='Demo', email='demo@aa.io', password='password')
#     marnie = User(
#         username='marnie', email='marnie@aa.io', password='password')
#     bobbie = User(
#         username='bobbie', email='bobbie@aa.io', password='password')

#     db.session.add(demo)
#     db.session.add(marnie)
#     db.session.add(bobbie)
#     db.session.commit()

def seed_users():
    all_users = [
        {
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe123",
            "email": "johndoe123@example.com",
            "hashed_password": "password1"
        },
        {
            "first_name": "Emily",
            "last_name": "Smith",
            "username": "emilysmith456",
            "email": "emilysmith456@example.com",
            "hashed_password": "password2"
        },
        {
            "first_name": "Michael",
            "last_name": "Johnson",
            "username": "mjohnson789",
            "email": "mjohnson789@example.com",
            "hashed_password": "password3"
        },
        {
            "first_name": "Sarah",
            "last_name": "Lee",
            "username": "sarahlee101",
            "email": "sarahlee101@example.com",
            "hashed_password": "password4"
        }
    ]

    create_users = [User(**user) for user in all_users]
    add_users = [db.session.add(user) for user in create_users]
    db.session.commit()
    return create_users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
