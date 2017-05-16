import unittest

import json
from everyday.tests.base import BaseTestCase


class TestUserModel(BaseTestCase):
    def test_user_status(self):
        """ Test for user status """
        with self.client:
            resp_register = self.client.post(
                '/register',
                data=json.dumps(dict(
                    email='joe@gmail.com',
                    password='123456'
                )),
                content_type='application/json'
            )
            response = self.client.get(
                '/user',
                headers=dict(
                    Authorization='Bearer ' + json.loads(
                        resp_register.data.decode()
                    )['auth_token']
                )
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['data'] is not None)
            self.assertTrue(data['data']['email'] == 'joe@gmail.com')
            self.assertEqual(response.status_code, 200)
