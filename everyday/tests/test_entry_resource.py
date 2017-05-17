import unittest

from everyday import db
from everyday.models import User
from everyday.tests.base import BaseTestCase

import json


class TestEntryResource(BaseTestCase):
    def setUp(self):
        super(TestEntryResource, self).setUp()
        user = User(
            email='foo@bar.com',
            password='test'
        )
        db.session.add(user)
        db.session.commit()
        self.auth_token = user.encode_auth_token(user.id).decode()

    def test_entry_creation(self):
        resp = self.client.post(
            '/entry',
            data=json.dumps({
                'notes': 'Hello world',
                'rating': 5
            }),
            content_type='application/json',
            headers={
                'Authorization': 'Bearer ' + self.auth_token
            }
        )
        data = json.loads(resp.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['data'] is not None)
        self.assertTrue(data['data']['notes'] == 'Hello world')
        self.assertTrue(data['data']['rating'] == 5)
        self.assertEqual(resp.status_code, 201)

    def test_entry_validation(self):
        resp = self.client.post(
            '/entry',
            data=json.dumps({
                'notes': 'Hello world',
                'rating': 11
            }),
            content_type='application/json',
            headers={
                'Authorization': 'Bearer ' + self.auth_token
            }
        )
        data = json.loads(resp.data.decode())
        self.assertTrue(data['message']['rating'])
        self.assertEqual(resp.status_code, 400)

        resp = self.client.post(
            '/entry',
            data=json.dumps({
                'notes': 'No rating... :(',
            }),
            content_type='application/json',
            headers={
                'Authorization': 'Bearer ' + self.auth_token
            }
        )
        data = json.loads(resp.data.decode())
        self.assertTrue(data['message']['rating'])
        self.assertEqual(resp.status_code, 400)

    def test_entry_auth(self):
        resp = self.client.post(
            '/entry',
            data=json.dumps({
                'notes': 'No token!',
                'rating': 5
            }),
            content_type='application/json'
        )
        data = json.loads(resp.data.decode())
        self.assertTrue(data['status'] == 'error')
        self.assertTrue(data.get('data') is None)
        self.assertEqual(resp.status_code, 401)

        resp = self.client.get('/entry')
        data = json.loads(resp.data.decode())
        self.assertTrue(data['status'] == 'error')
        self.assertTrue(data.get('data') is None)
        self.assertEqual(resp.status_code, 401)


if __name__ == '__main__':
    unittest.main()
