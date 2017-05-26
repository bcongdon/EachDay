import unittest

import json
from eachday import db
from eachday.models import User
from eachday.tests.base import BaseTestCase


class TestUserResource(BaseTestCase):
    def test_user_get(self):
        """ Test for user status """
        with self.client:
            user = User(
                email='foo@bar.com',
                password='test',
                name='joe'
            )
            db.session.add(user)
            db.session.commit()

            token = user.encode_auth_token(user.id).decode()
            response = self.client.get(
                '/user',
                headers={
                    'Authorization': 'Bearer ' + token
                }
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['data'] is not None)
            self.assertTrue(data['data']['email'] == 'foo@bar.com')
            self.assertTrue(data['data']['name'] == 'joe')
            self.assertTrue('password' not in data['data'])
            self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
