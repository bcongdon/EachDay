import unittest
from datetime import date

from eachday import db
from eachday.models import User
from eachday.tests.base import BaseTestCase


class TestUserModel(BaseTestCase):
    def test_encode_auth_token(self):
        user = User(
            email='foo@bar.com',
            password='test',
            name='joe'
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        self.assertIsInstance(auth_token, bytes)

    def test_decode_auth_token(self):
        user = User(
            email='foo@bar.com',
            password='test',
            name='joe'
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        self.assertIsInstance(auth_token, bytes)
        self.assertEqual(User.decode_auth_token(auth_token), user.id)

    def test_joined_on(self):
        user = User(
            email='foo@bar.com',
            password='test',
            name='joe',
            joined_on=date(2017, 1, 1)
        )
        db.session.add(user)
        db.session.commit()
        self.assertEqual(user.joined_on, date(2017, 1, 1))

if __name__ == '__main__':
    unittest.main()
