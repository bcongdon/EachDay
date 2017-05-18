import os
from flask import Flask
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

settings = os.getenv('APP_SETTINGS', 'everyday.config.DevelopmentConfig')
app.config.from_object(settings)

db = SQLAlchemy(app)
api = Api(app)
bcrypt = Bcrypt(app)


from . import resources
resources.create_apis(api)

if __name__ == '__main__':
    app.run()
