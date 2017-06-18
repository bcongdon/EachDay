from eachday.resources import LoginResource
from eachday.tests.base import BaseTestCase
from unittest.mock import patch
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


class TestExceptionHandler(BaseTestCase):

    @patch('eachday.resources.db')
    @patch('eachday.resources.log')
    def test_exception_handling(self, LogMock, DbMock):
        ''' Test that internal server errors are handled gracefully '''
        view_exception = Exception('Uh oh')

        # Inject function into /login to raise an exception
        def raise_error(self):
            raise view_exception
        LoginResource.post = raise_error

        resp = self.client.post('/login')
        self.assertEqual(resp.status_code, 500)
        data = json.loads(resp.data.decode())
        self.assertEqual(data['status'], 'error')
        self.assertEqual(data['error'], 'Something went wrong.')

        # Make sure session gets rolled back
        self.assertTrue(DbMock.session.rollback.called)

        # Make sure exception is logged correctly
        LogMock.error.assert_called_with(view_exception)
        LogMock.info.assert_called_with('Rolled back current session')
