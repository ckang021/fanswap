from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError
from app.api.aws_helpers import ALLOWED_EXTENSIONS

def dollar_sign_validate(form, field):
    if not field.data.startswith('$'):
        raise ValidationError('Price must have $.')

def price_greater_than_one(form, field):
    price = field.data.lstrip('$')
    try:
        if float(price) < 1:
            raise ValidationError('Price must be greater than 1.')
    except ValueError:
        raise ValidationError('Price must be a valid number.')

class CreateProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=0, max=500)])
    price = StringField('Price', validators=[DataRequired(), dollar_sign_validate, price_greater_than_one])
    description = StringField('Description', validators=[DataRequired(), Length(min=0, max=500)])
    preview_image = FileField('Image File', validators=[DataRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    category_id = IntegerField('Category', validators=[DataRequired()])
    submit = SubmitField('Post New Product')
