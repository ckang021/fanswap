from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Review
from ..forms import ReviewForm

review_routes = Blueprint('review', __name__)

def authorize(owner_id):
  if owner_id != current_user.id:
    return {
      "message":"Forbidden"
    }, 403
  return None

# REVIEWS (RUD)
@review_routes.route('/<int:review_id>')
def single_review(review_id):
  review = Review.query.get(review_id)
  if not review:
    return {
      "message": "Review doesn't exist"
    }, 404
  return review.to_dict()

@review_routes.route('/my-reviews')
@login_required
def own_reviews():
  user_id = current_user.id
  reviews = Review.query.filter_by(user_id = user_id).all()
  return {
    'reviews': [review.to_dict() for review in reviews]
  }

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_prod_review(review_id):
  review = Review.query.get(review_id)
  if not review:
    return {
      "message": "Review doesn't exist"
    }, 404
  authorized = authorize(review.user_id)
  if authorized:
    return authorized

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    review.review = form.data['review']
    review.star_rating = form.data['star_rating']
    db.session.commit()
    return review.to_dict(), 200
  else:
    return {
      "errors": form.errors
    }, 400

@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_prod_review(review_id):
  review = Review.query.get(review_id)
  if not review:
    return {
      "message": "Review doesn't exist"
    }, 404
  authorized = authorize(review.user_id)
  if authorized:
    return authorized

  db.session.delete(review)
  db.session.commit()
  return {
    "message": "Review successfully deleted"
  }, 200
