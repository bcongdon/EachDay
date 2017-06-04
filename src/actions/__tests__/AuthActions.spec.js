import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../AuthActions'
import * as types from '../types'
import nock from 'nock'
import jwt from 'jwt-simple'
import httpAdapter from 'axios/lib/adapters/http'
import axios from 'axios'
import expect from 'expect'
import Cookie from 'universal-cookie'
import { push } from 'react-router-redux'

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

axios.defaults.adapter = httpAdapter

jest.mock('universal-cookie')

describe('Async Auth Actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates AUTH_USER and sets cookie after loginUser is done', () => {
    const login = {
      email: 'foo@bar.baz',
      password: 'test'
    }
    const authObject = {foo: 'bar'}
    const fakeToken = jwt.encode(authObject, 'secret')

    nock('http://localhost:5000/')
      .post('/login')
      .reply(200, { status: 'success', auth_token: fakeToken })

    const expectedActions = [
      { type: types.AUTH_USER, payload: authObject },
      push('/dashboard') // Redirect to dashboard
    ]
    const store = mockStore({})

    return store.dispatch(actions.loginUser(login))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(Cookie.mock.instances.length).toEqual(1)
        expect(Cookie.mock.instances[0].set.mock.calls).toContain(['token', fakeToken, { path: '/' }])
      })
  })

  it('creates AUTH_USER and sets cookie after registerUser is done', () => {
    const login = {
      email: 'foo@bar.baz',
      password: 'test'
    }
    const authObject = {foo: 'bar'}
    const fakeToken = jwt.encode(authObject, 'secret')

    nock('http://localhost:5000/')
      .post('/register')
      .reply(200, { status: 'success', auth_token: fakeToken })

    const expectedActions = [
      { type: types.AUTH_USER, payload: authObject },
      push('/dashboard') // Redirect to dashboard
    ]
    const store = mockStore({})

    return store.dispatch(actions.registerUser(login))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(Cookie.mock.instances.length).toEqual(1)
        expect(Cookie.mock.instances[0].set.mock.calls).toContain(['token', fakeToken, { path: '/' }])
      })
  })

  it('creates AUTH_ERROR after a bad request', () => {
    const login = {
      email: 'foo@bar.baz',
      password: 'test'
    }

    nock('http://localhost:5000/')
      .post('/login')
      .reply(400, { status: 'error', error: 'Invalid login' })

    const expectedActions = [
      { type: types.AUTH_ERROR, payload: 'Invalid login' }
    ]
    const store = mockStore({})

    return store.dispatch(actions.loginUser(login))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates a UNAUTH_USER on logoutUser', () => {
    const expectedActions = [
      push('/'), // Redirect to home page
      { type: types.UNAUTH_USER }
    ]
    const store = mockStore({})
    return store.dispatch(actions.logoutUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('dispatches CLEAR_AUTH_ERROR for clearAuthError', () => {
    const expectedActions = [
      { type: types.CLEAR_AUTH_ERROR }
    ]
    const store = mockStore({})
    return store.dispatch(actions.clearAuthError())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
