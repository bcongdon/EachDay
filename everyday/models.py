from sqlalchemy.orm import validates
from sqlalchemy import UniqueConstraint
from everyday import app, db, bcrypt
from datetime import datetime, timedelta
import jwt
import marshmallow
from marshmallow import Schema, fields, validate, ValidationError


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()

    def encode_auth_token(self, user_id):
        """
        Generates an Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.utcnow() + timedelta(days=1),
                'iat': datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'


class Entry(db.Model):
    __tablename__ = 'entry'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.Date, nullable=False)
    notes = db.Column(db.Text)
    rating = db.Column(db.Integer)

    __table_args__ = (UniqueConstraint('user_id', 'date'),)

    @validates('rating')
    def validate_rating(self, key, rating):
        if not 1 <= rating <= 10:
            raise ValueError('Rating must be between 1 and 10')
        return rating


class UserSchema(Schema):
    id = fields.Int()
    email = fields.Str(required=True,
                       validate=validate.Email(error='Invalid email address'))
    password = fields.Str(load_only=True)


class EntrySchema(Schema):
    id = fields.Int()
    user_id = fields.Int()
    date = fields.Date(required=True)
    notes = fields.Str()
    rating = fields.Int(required=True)

    @marshmallow.validates('rating')
    def validate_rating(self, data):
        if not 1 <= data <= 10:
            raise ValidationError('Rating must be between 1 and 10')
        return data
