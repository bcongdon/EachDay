import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../ProfileActions'
import * as types from '../types'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'
import axios from 'axios'
import expect from 'expect'
import Cookie from 'universal-cookie'

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
    const fakeToken = 'foobarbaz'
    const authedProfile = { ...profile, auth_token: fakeToken }
    const endpoint = nock('http://localhost:5000/')
      .put('/user')
      .reply(200, { status: 'success', data: authedProfile })

    const expectedActions = [
      { type: types.CLEAR_PROFILE_API_ERROR },
      { type: types.USER_UPDATE, payload: authedProfile }
    ]
    const store = mockStore({})

    return store.dispatch(actions.updateProfile(submitProfile))
      .then(() => {
        expect(endpoint.isDone()).toBeTruthy()
        expect(store.getActions()).toEqual(expectedActions)
        expect(Cookie.mock.instances.length).toEqual(1)
        expect(Cookie.mock.instances[0].set.mock.calls).toContain(['token', fakeToken, { path: '/' }])
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
