from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
from models import db, User, Entry
from utils import send_error, send_success

app = Flask(__name__)
db.init_app(app)
api = Api(app)

with app.app_context():
    db.create_all()


class UserResource(Resource):
    def get(self, user_id=None):
        if not user_id:
            return [u.to_dict() for u in db.session.query(User).all()]

        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            send_error('Invalid user id', 404)

        return jsonify(user.to_dict())

    def post(self, user_id=None):
        parser = reqparse.RequestParser()
        parser.add_argument('name', required=True)
        parser.add_argument('email', required=True)
        args = parser.parse_args()

        user = User(name=args.name, email=args.email)
        db.session.add(user)
        db.session.commit()

        return jsonify(user.to_dict())


class EntryResource(Resource):
    def get(self, entry_id=None):
        if not entry_id:
            return [e.to_dict() for e in db.session.query(Entry).all()]

        entry = db.session.query(Entry).filter_by(id=entry_id).first()
        if not entry:
            send_error('Invalid entry id', 404)

        return jsonify(entry.to_dict())

    def post(self, entry_id=None):
        parser = reqparse.RequestParser()
        parser.add_argument('notes', required=True)
        parser.add_argument('rating', type=int, require=True)
        args = parser.parse_args()

        entry = Entry(notes=args.notes, rating=args.rating)
        db.session.add(entry)
        db.session.commit()

        return jsonify(entry.to_dict())


api.add_resouce(UserResource, '/user/<int:user_id')
api.add_resouce(EntryResource, '/entry/<int:entry_id')

if __name__ == '__main__':
    app.run()
