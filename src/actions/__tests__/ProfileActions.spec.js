import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../ProfileActions'
import * as types from '../types'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'
import axios from 'axios'
import expect from 'expect'

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

axios.defaults.adapter = httpAdapter

jest.mock('universal-cookie')

const profile = { id: 1, name: 'foo', email: 'bar@baz.com' }
const submitProfile = { ...profile, password: '12345' }

describe('Entry action creators', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('submits profile changes correctly', () => {
    const endpoint = nock('http://localhost:5000/')
      .put('/user')
      .reply(200, { status: 'success', data: profile })

    const expectedActions = [
      { type: types.CLEAR_PROFILE_API_ERROR },
      { type: types.USER_UPDATE, payload: profile }
    ]
    const store = mockStore({})

    return store.dispatch(actions.updateProfile(submitProfile))
      .then(() => {
        expect(endpoint.isDone()).toBeTruthy()
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates PROFILE_API_ERROR on unsuccessful responses', () => {
    const endpoint = nock('http://localhost:5000/')
      .put('/user')
      .reply(400, { status: 'error', error: 'Something broke' })

    const expectedActions = [
      { type: types.CLEAR_PROFILE_API_ERROR },
      { type: types.PROFILE_API_ERROR, payload: 'Something broke' }
    ]
    const store = mockStore({})

    return store.dispatch(actions.updateProfile(submitProfile))
      .then(() => {
        expect(endpoint.isDone()).toBeTruthy()
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
