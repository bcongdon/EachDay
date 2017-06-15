from eachday.tests.base import BaseTestCase
import json


class TestResourceUtils(BaseTestCase):
    def test_invalid_json_error(self):
        ''' Test that an invalid JSON body has a decent error message '''
        resp = self.client.post(
            '/register',
            data='{"invalid": json}',
            content_type='application/json'
        )
        data = json.loads(resp.data.decode())
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(data['status'], 'error')
        self.assertEqual(data['error'], 'Invalid JSON body')
