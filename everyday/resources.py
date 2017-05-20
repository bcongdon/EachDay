from flask import request, Request
from flask_restful import Resource, wraps
from .models import User, Entry, UserSchema, EntrySchema
from .utils import send_error, send_success, send_data

from everyday import db, bcrypt


def json_load_failed(self):
    return send_error('Invalid json body')

Request.on_json_load_failure = json_load_failed


def validate_auth(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(' ')[1]
        else:
            return send_error('Please provide an auth token', 401)

        resp = User.decode_auth_token(auth_token)
        if not isinstance(resp, str):
            user_id = resp
            return func(user_id=user_id, *args, **kwargs)
        else:
            return send_error(resp, 401)
    return wrapped


class UserResource(Resource):
    method_decorators = [validate_auth]

    def get(self, user_id=None):
        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return send_error('Invalid user id', 404)

        return send_data(user.to_dict())


class RegisterResource(Resource):
    def post(self):
        args, errors = UserSchema().load(request.get_json())
        if errors:
            return send_error(errors)

        user = db.session.query(User).filter_by(email=args['email']).first()
        if user:
            return send_error('User already exists.', 202)

        user = User(**args)
        db.session.add(user)
        db.session.commit()

        auth_token = user.encode_auth_token(user.id)
        return send_success('Successfully registered.', 201,
                            auth_token=auth_token.decode())


class LoginResource(Resource):
    def post(self):
        args, errors = UserSchema().load(request.get_json())
        if errors:
            return send_error(errors)

        user = db.session.query(User).filter_by(email=args['email']).first()
        if not user:
            return send_error('User does not exist.', 404)

        if bcrypt.check_password_hash(user.password, args['password']):
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
        args, errors = EntrySchema().load(request.get_json())
        if errors:
            return send_error(errors)

        entry = Entry(**args)
        db.session.add(entry)
        db.session.commit()

        return send_data(entry.to_dict(), 201)

    def put(self, entry_id, user_id=None):
        entry = db.session.query(Entry).filter_by(
            user_id=user_id, id=entry_id).first()

        if not entry:
            send_error('Invalid entry id', 404)

        entry_dict = entry.to_dict()
        entry_dict.update(request.get_json())

        args, errors = EntrySchema().load(entry_dict)
        if errors:
            return send_error(errors)

        db.session.query(Entry).filter_by(
            user_id=user_id, id=entry_id).update(args)

        db.session.commit()

        return send_data(entry.to_dict(), 200)


def create_apis(api):
    api.add_resource(UserResource, '/user')
    api.add_resource(EntryResource, '/entry/<int:entry_id>', '/entry')
    api.add_resource(LoginResource, '/login')
    api.add_resource(RegisterResource, '/register')
