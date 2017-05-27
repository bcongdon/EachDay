import unittest

import json
from eachday import db, bcrypt
from eachday.models import User
from eachday.tests.base import BaseTestCase


class TestUserResource(BaseTestCase):
    def setUp(self):
        super(TestUserResource, self).setUp()
        user = User(
            email='foo@bar.com',
            password='test',
            name='joe'
        )
        db.session.add(user)
        db.session.commit()
        self.user = user
        self.token = token = user.encode_auth_token(user.id).decode()

    def test_user_get(self):
        """ Test for getting user data """
        response = self.client.get(
            '/user',
            headers={
                'Authorization': 'Bearer ' + self.token
            }
        )
        data = json.loads(response.data.decode())
        self.assertEqual(data['status'], 'success')
        self.assertIn('data', data)
        self.assertEqual(data['data']['email'], 'foo@bar.com')
        self.assertEqual(data['data']['name'], 'joe')
        self.assertNotIn('password', ['data'])
        self.assertEqual(response.status_code, 200)

    def test_user_put(self):
        """ Test for editing user data """
        response = self.client.put(
            '/user',
            headers={
                'Authorization': 'Bearer ' + self.token
            },
            data=json.dumps({
                'email': 'new@email.website',
                'name': 'Donald Knuth',
                'password': 'test'
            })
        )
        data = json.loads(response.data.decode())
        self.assertEqual(data['status'], 'success')
        self.assertIn('data', data)
        self.assertEqual(data['data']['email'], 'new@email.website')
        self.assertEqual(data['data']['name'], 'Donald Knuth')
        self.assertNotIn('password', data['data'])
        self.assertEqual(response.status_code, 200)

    def test_user_put_invalid_auth(self):
        """ Test for editing user data with bad credentials """
        response = self.client.put(
            '/user',
            headers={
                'Authorization': 'Bearer ' + self.token
            },
            data=json.dumps({
                'email': 'new@email.website',
                'name': 'Donald Knuth',
                'password': 'foobar'
            })
        )
        data = json.loads(response.data.decode())
        self.assertEqual(data['status'], 'error')
        self.assertNotIn('data', data)
        self.assertEqual(data['error'], 'Invalid password.')
        self.assertEqual(response.status_code, 401)

        response = self.client.put(
            '/user',
            headers={
                'Authorization': 'Bearer ' + self.token
            },
            data=json.dumps({
                'email': 'new@email.website',
                'name': 'Donald Knuth',
                'new_password': 'foobar'
            })
        )
        data = json.loads(response.data.decode())
        self.assertEqual(data['status'], 'error')
        self.assertNotIn('data', data)
        self.assertEqual(data['error'], 'Must provide password')
        self.assertEqual(response.status_code, 401)

    def test_user_change_password(self):
        response = self.client.put(
            '/user',
            headers={
                'Authorization': 'Bearer ' + self.token
            },
            data=json.dumps({
                'password': 'test',
                'new_password': 'foobar'
            })
        )
        data = json.loads(response.data.decode())
        self.assertEqual(data['status'], 'success')
        self.assertIn('data', data)
        self.assertNotIn('password', data['data'])
        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            bcrypt.check_password_hash(self.user.password, 'foobar')
        )

if __name__ == '__main__':
    unittest.main()
