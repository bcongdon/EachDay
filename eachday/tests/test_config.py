import unittest
from flask import current_app
from flask_testing import TestCase
from eachday import app


class TestDevelopmentConfig(TestCase):
    def create_app(self):
        app.config.from_object('eachday.config.DevelopmentConfig')
        return app

    def test_app_is_development(self):
        self.assertNotEqual(app.config['SECRET_KEY'], 'changeme')
        self.assertTrue(app.config['DEBUG'])
        self.assertIsNotNone(current_app)
        dev_db = 'postgresql://postgres:@localhost/eachday'
        self.assertEqual(app.config['SQLALCHEMY_DATABASE_URI'], dev_db)


class TestTestingConfig(TestCase):
    def create_app(self):
        app.config.from_object('eachday.config.TestingConfig')
        return app

    def test_app_is_testing(self):
        self.assertNotEqual(app.config['SECRET_KEY'], 'changeme')
        self.assertIn('DEBUG', app.config)
        test_db = 'postgresql://postgres:@localhost/eachday_test'
        self.assertEqual(app.config['SQLALCHEMY_DATABASE_URI'], test_db)


class TestProductionConfig(TestCase):
    def create_app(self):
        app.config.from_object('eachday.config.ProductionConfig')
        return app

    def test_app_is_production(self):
        self.assertFalse(app.config['DEBUG'])


if __name__ == '__main__':
    unittest.main()
