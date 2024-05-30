from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, InputRequired, NumberRange

class ReviewForm(FlaskForm):
  review = StringField('Review', validators=[DataRequired(), Length(min=0, max=200)])
  star_rating = IntegerField('Stars', validators=[InputRequired(), NumberRange(min=1, max=5)])
  submit = SubmitField('Post Review')
