import os
from flask import Flask
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

settings = os.getenv('APP_SETTINGS', 'everyday.config.DevelopmentConfig')
app.config.from_object(settings)

db = SQLAlchemy(app)
api = Api(app)
bcrypt = Bcrypt(app)


from .resources import UserResource, EntryResource, LoginResource
api.add_resource(UserResource, '/user/<int:user_id>', '/user')
api.add_resource(EntryResource, '/entry/<int:entry_id>')
api.add_resource(LoginResource, '/login')


if __name__ == '__main__':
    app.run()
