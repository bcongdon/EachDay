import unittest

import json
from everyday.tests.base import BaseTestCase


class TestUserModel(BaseTestCase):
    def test_user_status(self):
        """ Test for user status """
        with self.client:
            resp_register = self.client.post(
                '/register',
                data=json.dumps({
                    'email': 'joe@gmail.com',
                    'password': '123456'
                }),
                content_type='application/json'
            )
            token = json.loads(resp_register.data.decode())['auth_token']
            response = self.client.get(
                '/user',
                headers={
                    'Authorization': 'Bearer ' + token
                }
            )
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['data'] is not None)
            self.assertTrue(data['data']['email'] == 'joe@gmail.com')
            self.assertTrue('password' not in data['data'])
            self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
