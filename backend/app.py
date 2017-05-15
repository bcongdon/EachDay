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
        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            send_error('Invalid user id', 404)
        return jsonify(user.to_dict())

    def post(self, user_id=None):
        parser = reqparse.RequestParser()
        parser.add_argument('name', required=True)
        parser.add_argument('email', require=True)
        args = parser.parse_args()

        user = User(name=args.name, email=args.email)
        db.session.add(user)
        db.session.commit()

        return jsonify(user.to_dict())


api.add_resouce(UserResource, '/user/<int:user_id')

if __name__ == '__main__':
    app.run()
