import unittest
from flask import current_app
from flask_testing import TestCase
from everyday import app


class TestDevelopmentConfig(TestCase):
    def create_app(self):
        app.config.from_object('everyday.config.DevelopmentConfig')
        return app

    def test_app_is_development(self):
        self.assertFalse(app.config['SECRET_KEY'] is 'changeme')
        self.assertTrue(app.config['DEBUG'] is True)
        self.assertFalse(current_app is None)
        dev_db = 'postgresql://postgres:@localhost/everyday'
        self.assertTrue(app.config['SQLALCHEMY_DATABASE_URI'] == dev_db)


class TestTestingConfig(TestCase):
    def create_app(self):
        app.config.from_object('everyday.config.TestingConfig')
        return app

    def test_app_is_testing(self):
        self.assertFalse(app.config['SECRET_KEY'] is 'changeme')
        self.assertTrue(app.config['DEBUG'])
        test_db = 'postgresql://postgres:@localhost/everyday_test'
        self.assertTrue(app.config['SQLALCHEMY_DATABASE_URI'] == test_db)


class TestProductionConfig(TestCase):
    def create_app(self):
        app.config.from_object('everyday.config.ProductionConfig')
        return app

    def test_app_is_production(self):
        self.assertTrue(app.config['DEBUG'] is False)


if __name__ == '__main__':
    unittest.main()
