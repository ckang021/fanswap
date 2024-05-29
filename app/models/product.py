from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500),nullable=False)
    price = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    preview_image = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)

    owner = db.relationship('User', back_populates='product')
    category = db.relationship('Category', back_populates='product')
    reviews = db.relationship('Review',back_populates='product', cascade="all, delete-orphan")
    images = db.relationship('ProductImage', back_populates='product', cascade="all, delete-orphan")

    def get_average_rating(self):
      count = len(self.reviews)
      if count == 0:
          return 0.0
      total_rating = sum(review.star_rating for review in self.reviews)
      average_rating = total_rating / count
      return round(average_rating, 1)

    def category_name(self):
        return self.category.name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description' : self.description,
            'preview_image' : self.preview_image,
            'owner_id': self.owner_id,
            'category_id': self.category_id,
            'category_name': self.category_name(),
            'rating': self.get_average_rating()
        }
