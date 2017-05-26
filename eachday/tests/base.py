from eachday import app, db
from flask_testing import TestCase


class BaseTestCase(TestCase):
    """ Base Tests for setup/config """

    def create_app(self):
        app.config.from_object('eachday.config.TestingConfig')
        return app

    def setUp(self):
        db.create_all()
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
