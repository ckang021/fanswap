from app.models import db, Review, environment, SCHEMA
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


def seed_reviews():
    all_reviews = [
    {
        "product_id": 1,
        "user_id": 2,
        "review": "Great quality and perfect for summer!",
        "star_rating": 5
    },
    {
        "product_id": 1,
        "user_id": 3,
        "review": "Nice hat but a bit pricey.",
        "star_rating": 4
    },
    {
        "product_id": 1,
        "user_id": 4,
        "review": "Not very comfortable, expected better quality.",
        "star_rating": 2
    },
    {
        "product_id": 2,
        "user_id": 1,
        "review": "Love the jersey, my favorite player!",
        "star_rating": 5
    },
    {
        "product_id": 2,
        "user_id": 3,
        "review": "Good quality but a bit expensive.",
        "star_rating": 4
    },
    {
        "product_id": 2,
        "user_id": 4,
        "review": "Disappointed with the fit, not worth the price.",
        "star_rating": 2
    },
    {
        "product_id": 3,
        "user_id": 1,
        "review": "My kid loves this t-shirt!",
        "star_rating": 5
    },
    {
        "product_id": 3,
        "user_id": 2,
        "review": "Good quality but the sizing is a bit off.",
        "star_rating": 3
    },
    {
        "product_id": 3,
        "user_id": 4,
        "review": "Fabric is not as soft as expected.",
        "star_rating": 3
    },
    {
        "product_id": 4,
        "user_id": 1,
        "review": "Perfect hat for sunny days.",
        "star_rating": 5
    },
    {
        "product_id": 4,
        "user_id": 2,
        "review": "Comfortable but wish it had more color options.",
        "star_rating": 4
    },
    {
        "product_id": 4,
        "user_id": 3,
        "review": "Looks nice but feels cheap.",
        "star_rating": 2
    },
    {
        "product_id": 5,
        "user_id": 2,
        "review": "Best jersey I’ve bought!",
        "star_rating": 5
    },
    {
        "product_id": 5,
        "user_id": 3,
        "review": "Looks great but feels a bit cheap.",
        "star_rating": 3
    },
    {
        "product_id": 5,
        "user_id": 4,
        "review": "Not worth the price, very disappointed.",
        "star_rating": 1
    },
    {
        "product_id": 6,
        "user_id": 1,
        "review": "Perfect for training camp.",
        "star_rating": 5
    },
    {
        "product_id": 6,
        "user_id": 3,
        "review": "Nice t-shirt, very breathable.",
        "star_rating": 4
    },
    {
        "product_id": 6,
        "user_id": 4,
        "review": "Too expensive for the quality offered.",
        "star_rating": 2
    },
    {
        "product_id": 7,
        "user_id": 1,
        "review": "Great hat, fits perfectly.",
        "star_rating": 5
    },
    {
        "product_id": 7,
        "user_id": 2,
        "review": "Nice but could be cheaper.",
        "star_rating": 4
    },
    {
        "product_id": 7,
        "user_id": 4,
        "review": "Poor quality, very disappointed.",
        "star_rating": 1
    },
    {
        "product_id": 8,
        "user_id": 1,
        "review": "Best jersey I’ve bought!",
        "star_rating": 5
    },
    {
        "product_id": 8,
        "user_id": 2,
        "review": "Looks great but feels a bit cheap.",
        "star_rating": 3
    },
    {
        "product_id": 8,
        "user_id": 3,
        "review": "Not worth the money, very poor quality.",
        "star_rating": 1
    },
    {
        "product_id": 9,
        "user_id": 1,
        "review": "Great t-shirt, very comfortable.",
        "star_rating": 4
    },
    {
        "product_id": 9,
        "user_id": 2,
        "review": "Love the design, very breathable.",
        "star_rating": 5
    },
    {
        "product_id": 9,
        "user_id": 4,
        "review": "Cheap fabric, not worth the price.",
        "star_rating": 2
    },
    {
        "product_id": 10,
        "user_id": 1,
        "review": "Perfect hat for sunny days.",
        "star_rating": 5
    },
    {
        "product_id": 10,
        "user_id": 3,
        "review": "Comfortable but wish it had more color options.",
        "star_rating": 4
    },
    {
        "product_id": 10,
        "user_id": 4,
        "review": "Quality is not as good as expected.",
        "star_rating": 3
    },
    {
        "product_id": 11,
        "user_id": 1,
        "review": "Great jersey, fits perfectly.",
        "star_rating": 5
    },
    {
        "product_id": 11,
        "user_id": 2,
        "review": "Nice but could be cheaper.",
        "star_rating": 4
    },
    {
        "product_id": 11,
        "user_id": 4,
        "review": "Poor quality, very disappointed.",
        "star_rating": 1
    },
    {
        "product_id": 12,
        "user_id": 1,
        "review": "Best t-shirt I’ve bought!",
        "star_rating": 5
    },
    {
        "product_id": 12,
        "user_id": 2,
        "review": "Looks great but feels a bit cheap.",
        "star_rating": 3
    },
    {
        "product_id": 12,
        "user_id": 3,
        "review": "Not worth the money, very poor quality.",
        "star_rating": 1
    },
    {
        "product_id": 13,
        "user_id": 2,
        "review": "Great quality and perfect for summer!",
        "star_rating": 5
    },
    {
        "product_id": 13,
        "user_id": 3,
        "review": "Nice hat but a bit pricey.",
        "star_rating": 4
    },
    {
        "product_id": 13,
        "user_id": 4,
        "review": "Not very comfortable, expected better quality.",
        "star_rating": 2
    },
    {
        "product_id": 14,
        "user_id": 1,
        "review": "Love the jersey, my favorite player!",
        "star_rating": 5
    },
    {
        "product_id": 14,
        "user_id": 3,
        "review": "Good quality but a bit expensive.",
        "star_rating": 4
    },
    {
        "product_id": 14,
        "user_id": 4,
        "review": "Disappointed with the fit, not worth the price.",
        "star_rating": 2
    },
    {
        "product_id": 15,
        "user_id": 1,
        "review": "My kid loves this t-shirt!",
        "star_rating": 5
    },
    {
        "product_id": 15,
        "user_id": 2,
        "review": "Good quality but the sizing is a bit off.",
        "star_rating": 3
    },
    {
        "product_id": 15,
        "user_id": 4,
        "review": "Fabric is not as soft as expected.",
        "star_rating": 3
    },
    {
        "product_id": 16,
        "user_id": 1,
        "review": "Perfect hat for sunny days.",
        "star_rating": 5
    },
    {
        "product_id": 16,
        "user_id": 2,
        "review": "Comfortable but wish it had more color options.",
        "star_rating": 4
    },
    {
        "product_id": 16,
        "user_id": 3,
        "review": "Looks nice but feels cheap.",
        "star_rating": 2
    },
    {
        "product_id": 17,
        "user_id": 2,
        "review": "Best jersey I’ve bought!",
        "star_rating": 5
    },
    {
        "product_id": 17,
        "user_id": 3,
        "review": "Looks great but feels a bit cheap.",
        "star_rating": 3
    },
    {
        "product_id": 17,
        "user_id": 4,
        "review": "Not worth the price, very disappointed.",
        "star_rating": 1
    },
    {
        "product_id": 18,
        "user_id": 1,
        "review": "Perfect for training camp.",
        "star_rating": 5
    },
    {
        "product_id": 18,
        "user_id": 3,
        "review": "Nice t-shirt, very breathable.",
        "star_rating": 4
    },
    {
        "product_id": 18,
        "user_id": 4,
        "review": "Too expensive for the quality offered.",
        "star_rating": 2
    },
    {
        "product_id": 19,
        "user_id": 1,
        "review": "Great hat, fits perfectly.",
        "star_rating": 5
    },
    {
        "product_id": 19,
        "user_id": 2,
        "review": "Nice but could be cheaper.",
        "star_rating": 4
    },
    {
        "product_id": 19,
        "user_id": 4,
        "review": "Poor quality, very disappointed.",
        "star_rating": 1
    },
    {
        "product_id": 20,
        "user_id": 1,
        "review": "Best jersey I’ve bought!",
        "star_rating": 5
    },
    {
        "product_id": 20,
        "user_id": 2,
        "review": "Looks great but feels a bit cheap.",
        "star_rating": 3
    },
    {
        "product_id": 20,
        "user_id": 3,
        "review": "Awesome jersey, very comfortable.",
        "star_rating": 5
    }
]


    create_reviews = [Review(**review) for review in all_reviews]
    add_reviews = [db.session.add(review) for review in create_reviews]
    db.session.commit()
    return create_reviews

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
