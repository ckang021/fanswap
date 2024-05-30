from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError
from app.api.aws_helpers import ALLOWED_EXTENSIONS

def dollar_sign_validate(form, field):
  if not field.data.startswith('$'):
    raise ValidationError('Price must have $.')

class ProductForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired(), Length(min=0, max=500)])
  price = StringField('Price', validators=[DataRequired(), dollar_sign_validate])
  description = StringField('Description', validators=[DataRequired(), Length(min=0, max=500)])
  preview_image = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  category_id = IntegerField('Category', validators=[DataRequired()])
  submit = SubmitField('Post New Product')
