import unittest

import json
from everyday.tests.base import BaseTestCase
from everyday.models import User
from everyday import db


class TestAuthRoutes(BaseTestCase):
    def test_registration(self):
        """ Test for user registration """
        response = self.client.post(
            '/register',
            data=json.dumps(dict(
                email='foo@bar.com',
                password='123456',
                name='joe'
            )),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['message'] == 'Successfully registered.')
        self.assertTrue(data['auth_token'])
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 201)

    def test_registration_missing_fields(self):
        """ Test for user registration with missing fields """
        response = self.client.post(
            '/register',
            data=json.dumps(dict(
                email='foo@bar.com',
            )),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'error')
        self.assertIn('error', data)
        self.assertIn('password', data['error'])
        self.assertIn('name', data['error'])
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 400)

    def test_registered_with_already_registered_user(self):
        """ Test registration with already registered email"""
        user = User(
            email='foo@bar.com',
            password='test',
            name='joe'
        )
        db.session.add(user)
        db.session.commit()

        response = self.client.post(
            '/register',
            data=json.dumps(dict(
                email='foo@bar.com',
                password='123456',
                name='moe'
            )),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'error')
        self.assertTrue(
            data['error'] == 'User already exists.')
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 202)

    def test_registered_user_login(self):
        """ Test for login of registered-user login """
        # user registration
        resp_register = self.client.post(
            '/register',
            data=json.dumps({
                'email': 'joe@gmail.com',
                'password': '123456',
                'name': 'joe'
            }),
            content_type='application/json',
        )
        data_register = json.loads(resp_register.data.decode())
        self.assertTrue(data_register['status'] == 'success')
        self.assertTrue(
            data_register['message'] == 'Successfully registered.'
        )
        self.assertTrue(data_register['auth_token'])
        self.assertTrue(resp_register.content_type == 'application/json')
        self.assertEqual(resp_register.status_code, 201)

        # registered user login
        response = self.client.post(
            '/login',
            data=json.dumps({
                'email': 'joe@gmail.com',
                'password': '123456'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['message'] == 'Successfully logged in.')
        self.assertTrue(data['auth_token'])
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 200)

    def test_incorrect_password(self):
        """ Test for login rejection of registered-user with bad password """
        # user registration
        resp_register = self.client.post(
            '/register',
            data=json.dumps({
                'email': 'joe@gmail.com',
                'password': '123456',
                'name': 'joe'
            }),
            content_type='application/json',
        )
        data_register = json.loads(resp_register.data.decode())
        self.assertTrue(data_register['status'] == 'success')
        self.assertTrue(
            data_register['message'] == 'Successfully registered.'
        )
        self.assertTrue(data_register['auth_token'])
        self.assertTrue(resp_register.content_type == 'application/json')
        self.assertEqual(resp_register.status_code, 201)

        # login with bad password
        response = self.client.post(
            '/login',
            data=json.dumps({
                'email': 'joe@gmail.com',
                'password': 'invalid password'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'error')
        self.assertTrue(data['error'] == 'Invalid login.')
        self.assertTrue('auth_token' not in data)
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 401)

    def test_non_registered_user_login(self):
        """ Test for login of non-registered user """
        response = self.client.post(
            '/login',
            data=json.dumps({
                'email': 'joe@gmail.com',
                'password': '123456'
            }),
            content_type='application/json'
        )
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'error')
        self.assertTrue(data['error'] == 'User does not exist.')
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 404)


if __name__ == '__main__':
    unittest.main()
