import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { formatErrorObject, errorHandler } from '../utils'

jest.mock('universal-cookie')
const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)
const MOCK_ERROR = 'mock_error'

describe('action utils', () => {
  it('should format error objects correctly', () => {
    const fakeErr = {
      foo: 'Value for foo is invalid',
      bar: '5 is an invalid value for bar'
    }

    const formatted = formatErrorObject(fakeErr)
    expect(formatted).toBe('foo: Value for foo is invalid, bar: 5 is an invalid value for bar')

    const fakeErr2 = {
      single_field: 'error for single_field'
    }
    const formatted2 = formatErrorObject(fakeErr2)
    expect(formatted2).toBe('single_field: error for single_field')
  })

  it('should dispatch correct message for responses with validation error objects', () => {
    const fakeResponse = {
      response: {
        data: {
          error: {
            foo: 'invalid foo',
            bar: 'invalid bar'
          }
        }
      }
    }

    const expectedActions = [
      { type: MOCK_ERROR, payload: 'foo: invalid foo, bar: invalid bar' }
    ]
    const store = mockStore({})

    return errorHandler(store.dispatch, fakeResponse, MOCK_ERROR)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should dispatch generic message when no response given', () => {
    const fakeResponse = {}
    const expectedActions = [
      { type: MOCK_ERROR, payload: 'There was an error connecting the EachDay server.' }
    ]
    const store = mockStore({})

    return errorHandler(store.dispatch, fakeResponse, MOCK_ERROR)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should dispatch generic message when response given, but no error message', () => {
    const fakeResponse = {
      response: {
        status: 'error',
        data: {}
      }
    }
    const expectedActions = [
      { type: MOCK_ERROR, payload: 'Something went wrong.' }
    ]
    const store = mockStore({})

    return errorHandler(store.dispatch, fakeResponse, MOCK_ERROR)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
