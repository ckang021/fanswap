from flask import Blueprint
from flask_login import login_required, current_user
from ..models import db, Product, ProductImage

product_img_routes = Blueprint('product_img', __name__)

def authorize(owner_id):
  if owner_id != current_user.id:
    return {
      "message":"Forbidden"
    }, 403
  return None

@product_img_routes.route('/<int:img_id>', methods=['DELETE'])
@login_required
def img_delete(img_id):
  img = ProductImage.query.get(img_id)
  if not img:
    return {
      "message": "Product image doesn't exist"
    }, 404

  product = Product.query.get(img.product_id)
  authorized = authorize(product.owner_id)
  if authorized:
    return authorized

  db.session.delete(img)
  db.session.commit()
  return {
    "message": "Product image successfully deleted"
  }, 200
