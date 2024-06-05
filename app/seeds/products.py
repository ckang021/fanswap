from app.models import db, Product, environment, SCHEMA
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

def seed_products():
    amazon = 'https://fanswapbucket.s3.us-west-1.amazonaws.com/'
    all_products = [
    {
        "name": "Chicago Bears New Era 2024 NFL Training Camp Panama Bucket Hat - White",
        "price": "$45.99",
        "description": "We're getting closer and closer to Week One of the NFL season. During the sweltering dog days of summer, this Chicago Bears 2024 NFL Training Camp Panama Bucket Hat is the perfect way to grab some shade while repping your team. The large 360-degree brim will keep the sun out of your face next time you're out and about.",
        "preview_image": amazon + "bears-bucket-hat-preview.jpg",
        "owner_id": 1,
        "category_id": 1
    },
    {
        "name": "Caleb Williams Chicago Bears Nike 2024 NFL Draft First Round Pick Player Game Jersey - Navy",
        "price": "$129.99",
        "description": "Represent your favorite team and player by grabbing this Caleb Williams 2024 NFL Draft First Round Pick Player Game Jersey from Nike. Complete with the Chicago Bears trademark colors and graphics you love, this jersey is the best way to show support for the Chicago Bears for seasons to come!",
        "preview_image": amazon + "caleb-williams-preview.jpg",
        "owner_id": 2,
        "category_id": 2
    },
    {
        "name": "Rome Odunze Chicago Bears Nike Youth 2024 NFL Draft Name & Number T-Shirt - Navy",
        "price": "$31.99",
        "description": "Encourage your young fan to show support for their favorite Chicago Bears player with this Rome Odunze Name and Number T-shirt from Nike. It's designed as a simpler alternative to the on-field Chicago Bears jerseys. Soft fabric makes this Chicago Bears tee an ideal option for game day.",
        "preview_image": amazon + "rome-odunze-preview.jpg",
        "owner_id": 3,
        "category_id": 3
    },
    {
        "name": "Los Angeles Chargers New Era 2024 NFL Training Camp 39THIRTY Flex Hat - White/Blue",
        "price": "$37.99",
        "description": "We're getting closer and closer to Week One of the NFL season. During the sweltering dog days of summer, this Los Angeles Chargers 2024 NFL Training Camp 39THIRTY Flex Hat is the perfect way to stay cool while repping your team. The flex fit makes this hat feel like it was tailor-made for you, with a little bit of flexibility for maximum comfort.",
        "preview_image": amazon + "chargers-hat-preview.jpg",
        "owner_id": 4,
        "category_id": 1
    },
    {
        "name": "Justin Herbert Los Angeles Chargers Nike Player Game Jersey - Powder Blue",
        "price": "$129.99",
        "description": "Rep the on-field look of your favorite Los Angeles Chargers player with this Justin Herbert Game jersey from Nike. Its heat-sealed name, numbers and team details provide a kickoff-ready aesthetic while also offering a comfortable, lightweight feel. Designed for everyday movement, this jersey has a versatile tailored fit and features mesh side panels for added ventilation as you celebrate every big play by the Los Angeles Chargers this season.",
        "preview_image": amazon + "justing-herbert-preview.jpg",
        "owner_id": 1,
        "category_id": 2
    },
    {
        "name": "Los Angeles Chargers New Era 2024 NFL Training Camp T-Shirt - Powder Blue",
        "price": "$39.99",
        "description": "We're getting closer and closer to Week 1 of the NFL season. During the sweltering dog days of summer, this Los Angeles Chargers 2024 NFL Training Camp T-Shirt is the perfect way to stay cool while repping your team. Made from breathable cotton, this tee will keep you at your best all day long, through training camp and beyond.",
        "preview_image": amazon + "chargers-shirt-preview.jpg",
        "owner_id": 2,
        "category_id": 3
    },
    {
        "name": "Arizona Cardinals New Era 2024 NFL Training Camp Golfer Snapback Hat - Gray",
        "price": "$38.99",
        "description": "We're getting closer and closer to Week One of the NFL season. During the sweltering dog days of summer, this Arizona Cardinals 2024 NFL Training Camp Golfer Snapback Hat is the perfect way to protect your face from the sun's harmful rays. The adjustable strap in the back allows you to fit this hat to your comfort.",
        "preview_image": amazon + "az-cards-hat-preview.jpg",
        "owner_id": 3,
        "category_id": 1
    },
    {
        "name": "Kyler Murray Arizona Cardinals Nike Game Player Jersey - White",
        "price": "$129.99",
        "description": "Rep the on-field look of your favorite Arizona Cardinals player with this Kyler Murray Game jersey by Nike. Its heat-applied graphics provide a kickoff-ready aesthetic while also offering a comfortable, lightweight feel. Designed for everyday movement, this jersey has a tailored fit and features mesh side panels for added ventilation as you celebrate every big play by Kyler Murray this season.",
        "preview_image": amazon + "kyler-murray-preview.jpg",
        "owner_id": 4,
        "category_id": 2
    },
    {
        "name": "DeAndre Hopkins Arizona Cardinals Nike Name & Number T-Shirt - Black",
        "price": "$39.99",
        "description": "DeAndre Hopkins is your favorite player, and for a good reason. Show him your support by grabbing this Arizona Cardinals Name and Number T-Shirt from Nike. It features bold Arizona Cardinals and DeAndre Hopkins graphics, so no one will be able to question where your allegiance lies when you rock this sweet gear.",
        "preview_image": amazon + "d-hop-preview.jpg",
        "owner_id": 1,
        "category_id": 3
    },
    {
        "name": "Houston Texans New Era 2024 NFL Training Camp 39THIRTY Flex Hat - Gray",
        "price": "$37.99",
        "description": "We're getting closer and closer to Week One of the NFL season. During the sweltering dog days of summer, this Houston Texans 2024 NFL Training Camp 39THIRTY Flex Hat is the perfect way to stay cool while repping your team. The flex fit makes this hat feel like it was tailor-made for you, with a little bit of flexibility for maximum comfort.",
        "preview_image": amazon + "texans-hat-preview.jpg",
        "owner_id": 2,
        "category_id": 1
    },
    {
        "name": "C.J. Stroud Houston Texans Nike 2nd Alternate Game Jersey - Navy",
        "price": "$129.99",
        "description": "Made for the enthusiastic Houston Texans fan who wants to represent the team with ease, this C.J. Stroud 2nd Alternate Game Jersey by Nike. Its printed name and number graphics provide a kickoff-ready aesthetic while also offering a comfortable, lightweight feel. Designed for everyday movement, this jersey has a loose fit and features mesh side panels for added ventilation as you celebrate every big play by C.J. Stroud this season.",
        "preview_image": amazon + "cj-stroud-preview.jpeg",
        "owner_id": 3,
        "category_id": 2
    },
    {
        "name": "Houston Texans New Era 2024 NFL Training Camp T-Shirt - Navy",
        "price": "$39.99",
        "description": "We're getting closer and closer to Week 1 of the NFL season. During the sweltering dog days of summer, this Houston Texans 2024 NFL Training Camp T-Shirt is the perfect way to stay cool while repping your team. Made from breathable cotton, this tee will keep you at your best all day long, through training camp and beyond.",
        "preview_image": amazon + "texans-shirt-preview.jpeg",
        "owner_id": 4,
        "category_id": 3
    },
    {
        "name": "Baltimore Ravens New Era 2024 NFL Training Camp Stretch Bucket Hat - White",
        "price": "$45.99",
        "description": "We're getting closer and closer to Week One of the NFL season. During the sweltering dog days of summer, this New Era Baltimore Ravens 2024 NFL Training Camp Stretch Bucket Hat is the perfect way to stay cool while repping your team. The 360-degree brim is perfect for keeping the sun out of your face next time you step outside.",
        "preview_image": amazon + "ravens-bucket-hat-preview.jpg",
        "owner_id": 1,
        "category_id": 1
    },
    {
        "name": "Lamar Jackson Baltimore Ravens Nike Game Jersey - Purple",
        "price": "$129.99",
        "description": "Rep the on-field look of your favorite Baltimore Ravens player with this Lamar Jackson Game jersey from Nike. Its heat-sealed name, numbers and team details provide a kickoff-ready aesthetic while also offering a comfortable, lightweight feel. Designed for everyday movement, this jersey has a versatile tailored fit and features mesh side panels for added ventilation as you celebrate every big play by the Baltimore Ravens this season.",
        "preview_image": amazon + "lamar-jackson-preview.jpg",
        "owner_id": 2,
        "category_id": 2
    },
    {
        "name": "Baltimore Ravens Nike Blitz Essential T-Shirt - Cream",
        "price": "$39.99",
        "description": "Gear up to see your NFL squad run through the defensive line by snagging this Baltimore Ravens Blitz Essential T-shirt from Nike. Along with an understated Baltimore Ravens wordmark on the left chest, this tee features sizable team graphics printed on the back to ensure your team spirit can be seen from all angles. The cotton design and neutral color makes it easy to pair this tee with your go-to hat or accessory.",
        "preview_image": amazon + "ravens-shirt-preview.jpg",
        "owner_id": 3,
        "category_id": 3
    },
    {
        "name": "New Orleans Saints New Era 2024 NFL Training Camp 9SEVENTY Trucker Hat - White/Black",
        "price": "$39.99",
        "description": "We're getting closer and closer to Week One of the NFL season. During the sweltering dog days of summer, this New Orleans Saints 2024 NFL Training Camp 9SEVENTY Trucker Hat is the perfect way to stay cool while repping your team. The adjustable snap in the back allows you to fit this hat perfectly to your comfort.",
        "preview_image": amazon + "saints-hat-preview.jpg",
        "owner_id": 4,
        "category_id": 1
    },
    {
        "name": "Chris Olave New Orleans Saints Nike Player Game Jersey - Black",
        "price": "$129.99",
        "description": "Celebrate your undying New Orleans Saints fandom with this Chris Olave Player Game Jersey by Nike. Get ready to root for your team with this stylish gear. It features high-quality New Orleans Saints graphics that even your favorite players would approve of!",
        "preview_image": amazon + "chris-olave-preview.jpg",
        "owner_id": 1,
        "category_id": 2
    },
    {
        "name": "New Orleans Saints Nike 2024 Sideline Coach UV Performance T-Shirt - Black",
        "price": "$54.99",
        "description": "Highlight your fierce loyalty to the New Orleans Saints by putting on this 2024 Sideline Coach UV tee. Constructed by Nike, this T-shirt features the iconic New Orleans Saints wordmark on the left chest and the NFL shield on the right sleeve. Boosted by UVA and UVB protection, this shirt also is built with Dri-FIT technology, which will wick moisture away from your body.",
        "preview_image": amazon + "saints-shirt-preview.jpg",
        "owner_id": 2,
        "category_id": 3
    },
    {
        "name": "Washington Commanders New Era 2024 NFL Training Camp 39THIRTY Flex Hat - Gray",
        "price": "$37.99",
        "description": "We're getting closer and closer to Week One of the NFL season. During the sweltering dog days of summer, this Washington Commanders 2024 NFL Training Camp 39THIRTY Flex Hat is the perfect way to stay cool while repping your team. The flex fit makes this hat feel like it was tailor-made for you, with a little bit of flexibility for maximum comfort.",
        "preview_image": amazon + "commanders-hat-preview.jpg",
        "owner_id": 3,
        "category_id": 1
    },
    {
        "name": "Jayden Daniels Washington Commanders Nike 2024 NFL Draft First Round Pick Player Game Jersey - Burgundy",
        "price": "$129.99",
        "description": "Represent your favorite team and player by grabbing this Jayden Daniels 2024 NFL Draft First Round Pick Player Game Jersey from Nike. Complete with the Washington Commanders trademark colors and graphics you love, this jersey is the best way to show support for the Washington Commanders for seasons to come!",
        "preview_image": amazon + "jayden-daniels-preview.jpg",
        "owner_id": 4,
        "category_id": 2
    }
]


    create_products = [Product(**product) for product in all_products]
    add_products = [db.session.add(product) for product in create_products]
    db.session.commit()
    return create_products


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
