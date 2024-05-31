from flask import Blueprint, request
from flask_login import login_required, current_user
from .aws_helpers import (upload_file_to_s3, get_unique_filename)
from ..models import db, Product, ProductImage, Review, Category
from ..forms import ProductForm, ProductImageForm, ReviewForm

product_routes = Blueprint('product', __name__)

def authorize(owner_id):
  if owner_id != current_user.id:
    return {
      "message":"Forbidden"
    }, 403
  return None

# PRODUCT ROUTE (CRUD)
@product_routes.route('/')
def all_products():
    search_name = request.args.get('name')
    query = Product.query.join(Category)

    if search_name:
        query = query.filter(
            db.or_(
                Product.name.ilike(f'%{search_name}%'),
                Category.name.ilike(f'%{search_name}%')
            )
        )

    products = query.all()

    print(f"Search Query: {search_name}")
    print(f"Found Products: {[product.name for product in products]}")

    return {
        'products': [product.to_dict() for product in products]
    }



@product_routes.route('/my-products')
@login_required
def own_products():
  user_id = current_user.id
  products = Product.query.filter_by(owner_id = user_id).all()
  return {
    'products': [product.to_dict() for product in products]
  }

@product_routes.route('/<int:product_id>')
def single_product(product_id):
  product = Product.query.get(product_id)
  if product:
    return {
      'product': product.to_dict()
    }
  else:
    return {
      "message": "Product doesn't exist"
    }, 404

@product_routes.route('/new-product', methods=['POST'])
@login_required
def new_product():
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    image = form.data['preview_image']
    url = None
    print('IMAGE ===> ', image)

    if image:
      image.filename = get_unique_filename(image.filename)
      upload = upload_file_to_s3(image)
      if "url" not in upload:
        return {
          "error": "Image upload failed, not a valid file."
        }, 400
      url = upload['url']

    new_prod = Product(
      name = form.data['name'],
      price = form.data['price'],
      description = form.data['description'],
      preview_image = url,
      owner_id = current_user.id,
      category_id = form.data['category_id']
    )
    db.session.add(new_prod)
    db.session.commit()
    return new_prod.to_dict(), 201
  else:
    return {
      "errors": form.errors
    }, 400


@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):
  product = Product.query.get(product_id)
  if not product:
    return {
      "message": "Product doesn't exist"
    }, 404

  authorized = authorize(product.owner_id)
  if authorized:
    return authorized

  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    product.name = form.data['name']
    product.price = form.data['price']
    product.description = form.data['description']
    # product.preview_image = form.data['preview_image']
    product.category_id = form.data['category_id']
    db.session.commit()
    return product.to_dict(), 200
  else:
    return {
      "errors": form.errors
    }, 400

@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
  product = Product.query.get(product_id)
  if not product:
    return {
      "message": "Product doesn't exist"
    }, 404

  authorized = authorize(product.owner_id)
  if authorized:
    return authorized

  db.session.delete(product)
  db.session.commit()
  return {
    "message": "Product successfully delete"
    }, 200

# PRODUCT ALL IMAGES (CR)
@product_routes.route('/<int:prod_id>/imgs')
def product_images(prod_id):
  product_images = ProductImage.query.filter_by(product_id = prod_id).all()
  return {
    'ProductImages': [image.to_dict() for image in product_images]
  }

@product_routes.route('/<int:prod_id>/imgs/new', methods=['POST'])
@login_required
def create_prod_img(prod_id):
  product = Product.query.get(prod_id)

  authorized = authorize(product.owner_id)
  if authorized:
    return authorized

  form = ProductImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    image = form.data['image_file']

    if image:
      image.filename = get_unique_filename(image.filename)
      upload = upload_file_to_s3(image)
      if "url" not in upload:
        return {
          "error": "Image upload failed, not a valid file"
        }, 400
      url = upload['url']

    image_new = ProductImage(
      product_id = prod_id,
      image_file = url
    )

    db.session.add(image_new)
    db.session.commit()
    return image_new.to_dict()
  else:
    return {
      "errors": form.errors
    }, 400

# PRODUCT ALL REVIEWS (CR)
@product_routes.route('/<int:prod_id>/reviews')
def product_reviews(prod_id):
  product = Product.query.get(prod_id)
  if not product:
    return {
      "message": "Product doesn't exist"
    }, 404

  reviews = Review.query.filter_by(product_id = prod_id).all()
  return {
    'reviews': [review.to_dict() for review in reviews]
  }

@product_routes.route('/<int:prod_id>/reviews/new', methods=['POST'])
@login_required
def create_prod_review(prod_id):

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    product = Product.query.get(prod_id)
    if not product:
      return {
        "message": "Product doesn't exist"
      }, 404

    review_new = Review (
      product_id = prod_id,
      user_id = current_user.id,
      review = form.data['review'],
      star_rating = form.data['star_rating']
    )

    db.session.add(review_new)
    db.session.commit()
    return review_new.to_dict(), 201
  else:
    return {
      "errors": form.errors
    }, 400

# PRODUCT CATEGORY FILTERS
@product_routes.route('/categories')
def prod_category():
  categories = Category.query.all()
  return {
    'categories': [category.to_dict() for category in categories]
  }

@product_routes.route('/category/<int:cat_id>')
def products_by_category(cat_id):
    products = Product.query.filter_by(category_id = cat_id).all()
    return {
      'products': [product.to_dict() for product in products]
    }
