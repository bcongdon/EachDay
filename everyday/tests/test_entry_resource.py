import unittest

from everyday import db
from everyday.models import User, Entry
from everyday.tests.base import BaseTestCase
from datetime import date, timedelta

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
        self.user = user
        self.auth_token = user.encode_auth_token(user.id).decode()

    def test_entry_creation(self):
        resp = self.client.post(
            '/entry',
            data=json.dumps({
                'notes': 'Hello world',
                'rating': 5,
                'date': '1-1-2017'
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
        # Test rating validation
        resp = self.client.post(
            '/entry',
            data=json.dumps({
                'notes': 'Hello world',
                'rating': 11,
                'date': '1-1-2010'
            }),
            content_type='application/json',
            headers={
                'Authorization': 'Bearer ' + self.auth_token
            }
        )
        data = json.loads(resp.data.decode())
        self.assertTrue('rating' in data['message'])
        self.assertEqual(resp.status_code, 400)

        # Test date validation
        resp = self.client.post(
            '/entry',
            data=json.dumps({
                'notes': 'Hello world',
                'rating': 5,
                'date': 'foobar'
            }),
            content_type='application/json',
            headers={
                'Authorization': 'Bearer ' + self.auth_token
            }
        )
        data = json.loads(resp.data.decode())
        self.assertTrue('date' in data['message'])
        self.assertEqual(resp.status_code, 400)

        # Test rating required
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

    def test_entry_getting(self):
        entry1 = Entry(user_id=self.user.id,
                       rating=1,
                       notes='foobar',
                       date=date.today() + timedelta(days=1))
        entry2 = Entry(user_id=self.user.id, rating=2, date=date.today())
        db.session.add(entry1)
        db.session.add(entry2)
        db.session.commit()

        # Test getting a list of entries
        resp = self.client.get(
            '/entry',
            headers={
                'Authorization': 'Bearer ' + self.auth_token
            }
        )
        data = json.loads(resp.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertIn('data', data)
        entry_ids = [e.get('id') for e in data['data']]
        self.assertIn(entry1.id, entry_ids)
        self.assertIn(entry2.id, entry_ids)
        self.assertEqual(resp.status_code, 200)

        # Test getting a specific entry
        resp = self.client.get(
            '/entry/{}'.format(entry1.id),
            headers={
                'Authorization': 'Bearer ' + self.auth_token
            }
        )
        data = json.loads(resp.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertIn('data', data)
        self.assertEqual(entry1.id, data['data']['id'])
        self.assertEqual(entry1.rating, data['data']['rating'])
        self.assertEqual(entry1.notes, data['data']['notes'])
        self.assertEqual(resp.status_code, 200)

    def test_entry_editing(self):
        entry1 = Entry(user_id=self.user.id,
                       rating=1,
                       notes='foobar',
                       date=date.today())
        db.session.add(entry1)
        db.session.commit()

        # Test editing an entry with PUT
        resp = self.client.put(
            '/entry/{}'.format(entry1.id),
            data={
                'rating': 10,
                'notes': 'changed'
            },
            headers={
                'Authorization': 'Bearer ' + self.auth_token
            }
        )
        data = json.loads(resp.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertIn('data', data)
        self.assertEqual(entry1.id, data['data']['id'])
        self.assertEqual(10, data['data']['rating'])
        self.assertEqual('changed', data['data']['notes'])
        self.assertEqual(resp.status_code, 200)


if __name__ == '__main__':
    unittest.main()
