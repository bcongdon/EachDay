from sqlalchemy.orm import validates
from sqlalchemy import UniqueConstraint
from eachday import app, db, bcrypt
from datetime import datetime, timedelta
import jwt
import marshmallow
from marshmallow import Schema, fields, validate, ValidationError


class User(db.Model):
    __tablename__ = 'user'
    TOKEN_EXPIRATION_DAYS = 1
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()

    def __init__(self, email, password, name):
        self.email = email
        self.set_password(password)
        self.name = name

    def encode_auth_token(self, user_id):
        """
        Generates an Auth Token
        :return: string
        """
        try:
            td = timedelta(days=User.TOKEN_EXPIRATION_DAYS)
            payload = {
                'exp': datetime.utcnow() + td,
                'iat': datetime.utcnow(),
                'sub': user_id,
                'name': self.name,
                'email': self.email,
                'id': self.id
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
            raise Exception('Signature expired. Please log in again.')
        except jwt.InvalidTokenError:
            raise Exception('Invalid token. Please log in again.')


class Entry(db.Model):
    __tablename__ = 'entry'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    notes = db.Column(db.Text)
    rating = db.Column(db.Integer)

    __table_args__ = (UniqueConstraint('user_id', 'date'),)

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating is not None and not 1 <= rating <= 10:
            raise ValueError('Rating must be between 1 and 10')
        return rating


class BlacklistToken(db.Model):
    __tablename__ = 'blacklist_token'
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String, unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.utcnow()


class UserSchema(Schema):
    id = fields.Int()
    email = fields.Str(required=True,
                       validate=validate.Email(error='Invalid email address'))
    password = fields.Str(required=True, load_only=True)
    name = fields.Str(required=True)


class EntrySchema(Schema):
    id = fields.Int()
    user_id = fields.Int()
    date = fields.Date(required=True)
    notes = fields.Str(allow_none=True)
    rating = fields.Int(allow_none=True)

    @marshmallow.validates('rating')
    def validate_rating(self, data):
        if data is not None and not 1 <= data <= 10:
            raise ValidationError('Rating must be between 1 and 10')
        return data
