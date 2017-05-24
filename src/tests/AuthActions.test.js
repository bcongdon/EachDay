import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/AuthActions'
import * as types from '../actions/types'
import nock from 'nock'
import jwt from 'jwt-simple'
import httpAdapter from 'axios/lib/adapters/http'
import axios from 'axios'
import expect from 'expect'

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

axios.defaults.adapter = httpAdapter

describe('Async Auth Actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates AUTH_USER after loginUser is done', () => {
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
      { type: types.AUTH_USER, payload: authObject }
    ]
    const store = mockStore({})

    return store.dispatch(actions.loginUser(login))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
