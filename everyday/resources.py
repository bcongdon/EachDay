from flask import jsonify, request
from flask_restful import Resource, reqparse, wraps
from .models import User, Entry
from .utils import send_error, send_success, send_data

from everyday import db, bcrypt


def validate_auth(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            return send_error('Please provide an auth token', 401)

        resp = User.decode_auth_token(auth_token)
        if not isinstance(resp, str):
            user_id = resp
            return func(user_id=user_id, *args, **kwargs)
        else:
            return send_error(resp, 401)
    return wrapped


def validate_rating(rating):
    rating = int(rating)
    if not 1 <= rating <= 10:
        raise ValueError('Rating must be between 1 and 10')
    return rating


class UserResource(Resource):
    method_decorators = [validate_auth]

    def get(self, user_id=None):
        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return send_error('Invalid user id', 404)

        return send_data(user.to_dict())


class RegisterResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', required=True)
        parser.add_argument('password', required=True)
        args = parser.parse_args()

        user = db.session.query(User).filter_by(email=args.email).first()
        if user:
            return send_error('User already exists.', 202)

        user = User(email=args.email, password=args.password)
        db.session.add(user)
        db.session.commit()

        auth_token = user.encode_auth_token(user.id)
        return send_success('Successfully registered.', 201,
                            auth_token=auth_token.decode())


class LoginResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', required=True)
        parser.add_argument('password', required=True)
        args = parser.parse_args()

        user = db.session.query(User).filter_by(email=args.email).first()
        if not user:
            return send_error('User does not exist.', 404)

        if bcrypt.check_password_hash(user.password, args.password):
            auth_token = user.encode_auth_token(user.id)
            return send_success('Successfully logged in.', 200,
                                auth_token=auth_token.decode())
        else:
            return send_error('Invalid login.', 401)


class EntryResource(Resource):
    method_decorators = [validate_auth]

    def get(self, user_id=None, entry_id=None):
        entries = db.session.query(Entry).filter_by(user_id=user_id)

        if not entry_id:
            return send_data([e.to_dict() for e in entries.all()])

        entry = entries.filter_by(id=entry_id).first()
        if not entry:
            send_error('Invalid entry id', 404)

        return send_data(entry.to_dict())

    def post(self, user_id=None, entry_id=None):
        parser = reqparse.RequestParser()
        parser.add_argument('notes', required=True)
        parser.add_argument('rating', type=validate_rating, required=True)
        args = parser.parse_args()

        entry = Entry(notes=args.notes, rating=args.rating, user_id=user_id)
        db.session.add(entry)
        db.session.commit()

        return send_data(entry.to_dict(), 201)


def create_apis(api):
    api.add_resource(UserResource, '/user')
    api.add_resource(EntryResource, '/entry/<int:entry_id>', '/entry')
    api.add_resource(LoginResource, '/login')
    api.add_resource(RegisterResource, '/register')
