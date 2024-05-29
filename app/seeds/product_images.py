from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    amazon = 'https://fanswapbucket.s3.us-west-1.amazonaws.com/'
    all_product_images = [
        {"product_id": 1, "image_file": amazon + "bears-bucket-hat-1.jpg"},
        {"product_id": 1, "image_file": amazon + "bears-bucket-hat-2.jpg"},
        {"product_id": 1, "image_file": amazon + "bears-bucket-hat-3.jpg"},
        {"product_id": 2, "image_file": amazon + "caleb-williams-1.jpg"},
        {"product_id": 2, "image_file": amazon + "caleb-williams-2.jpg"},
        {"product_id": 2, "image_file": amazon + "caleb-williams-3.jpg"},
        {"product_id": 3, "image_file": amazon + "rome-odunze-1.jpg"},
        {"product_id": 3, "image_file": amazon + "rome-odunze-2.jpg"},
        {"product_id": 3, "image_file": amazon + "rome-odunze-3.jpg"},
        {"product_id": 4, "image_file": amazon + "chargers-hat-1.jpg"},
        {"product_id": 4, "image_file": amazon + "chargers-hat-2.jpg"},
        {"product_id": 4, "image_file": amazon + "chargers-hat-3.jpg"},
        {"product_id": 5, "image_file": amazon + "justing-herbert-1.jpg"},
        {"product_id": 5, "image_file": amazon + "justing-herbert-2.jpg"},
        {"product_id": 5, "image_file": amazon + "justing-herbert-3.jpg"},
        {"product_id": 6, "image_file": amazon + "chargers-shirt-1.jpg"},
        {"product_id": 6, "image_file": amazon + "chargers-shirt-2.jpg"},
        {"product_id": 6, "image_file": amazon + "chargers-shirt-3.jpg"},
        {"product_id": 7, "image_file": amazon + "az-cards-hat-1.jpg"},
        {"product_id": 7, "image_file": amazon + "az-cards-hat-2.jpg"},
        {"product_id": 7, "image_file": amazon + "az-cards-hat-3.jpg"},
        {"product_id": 8, "image_file": amazon + "kyler-murray-1.jpg"},
        {"product_id": 8, "image_file": amazon + "kyler-murray-2.jpg"},
        {"product_id": 8, "image_file": amazon + "kyler-murray-3.jpg"},
        {"product_id": 9, "image_file": amazon + "d-hop-1.jpg"},
        {"product_id": 9, "image_file": amazon + "d-hop-2.jpg"},
        {"product_id": 9, "image_file": amazon + "d-hop-3.jpg"},
        {"product_id": 10, "image_file": amazon + "texans-hat-1.jpg"},
        {"product_id": 10, "image_file": amazon + "texans-hat-2.jpg"},
        {"product_id": 10, "image_file": amazon + "texans-hat-3.jpg"},
        {"product_id": 11, "image_file": amazon + "cj-stroud-1.jpeg"},
        {"product_id": 11, "image_file": amazon + "cj-stroud-2.jpeg"},
        {"product_id": 11, "image_file": amazon + "cj-stroud-3.jpeg"},
        {"product_id": 12, "image_file": amazon + "texans-shirt-1.jpeg"},
        {"product_id": 12, "image_file": amazon + "texans-shirt-2.jpeg"},
        {"product_id": 12, "image_file": amazon + "texans-shirt-3.jpeg"},
        {"product_id": 13, "image_file": amazon + "ravens-bucket-hat-1.jpg"},
        {"product_id": 13, "image_file": amazon + "ravens-bucket-hat-2.jpg"},
        {"product_id": 13, "image_file": amazon + "ravens-bucket-hat-3.jpg"},
        {"product_id": 14, "image_file": amazon + "lamar-jackson-1.jpg"},
        {"product_id": 14, "image_file": amazon + "lamar-jackson-2.jpg"},
        {"product_id": 14, "image_file": amazon + "lamar-jackson-3.jpg"},
        {"product_id": 15, "image_file": amazon + "ravens-shirt-1.jpg"},
        {"product_id": 15, "image_file": amazon + "ravens-shirt-2.jpg"},
        {"product_id": 15, "image_file": amazon + "ravens-shirt-3.jpg"},
        {"product_id": 16, "image_file": amazon + "saints-hat-1.jpg"},
        {"product_id": 16, "image_file": amazon + "saints-hat-2.jpg"},
        {"product_id": 16, "image_file": amazon + "saints-hat-3.jpg"},
        {"product_id": 17, "image_file": amazon + "chris-olave-1.jpg"},
        {"product_id": 17, "image_file": amazon + "chris-olave-2.jpg"},
        {"product_id": 17, "image_file": amazon + "chris-olave-3.jpg"},
        {"product_id": 18, "image_file": amazon + "saints-shirt-1.jpg"},
        {"product_id": 18, "image_file": amazon + "saints-shirt-2.jpg"},
        {"product_id": 18, "image_file": amazon + "saints-shirt-3.jpg"},
        {"product_id": 19, "image_file": amazon + "commanders-hat-1.jpg"},
        {"product_id": 19, "image_file": amazon + "commanders-hat-2.jpg"},
        {"product_id": 19, "image_file": amazon + "commanders-hat-3.jpg"},
        {"product_id": 20, "image_file": amazon + "jayden-daniels-1.jpg"},
        {"product_id": 20, "image_file": amazon + "jayden-daniels-2.jpg"},
        {"product_id": 20, "image_file": amazon + "jayden-daniels-3.jpg"},
    ]

    create_product_images = [ProductImage(**product_image) for product_image in all_product_images]
    for product_image in create_product_images:
        db.session.add(product_image)
    db.session.commit()
    return create_product_images

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
    db.session.commit()
