import expect from 'expect'
import * as types from '../../actions/types'
import authReducer from '../AuthReducers'

describe('Auth Reducers', () => {
  it('AUTH_USER should clear error and set authenticated and user object', () => {
    const initialState = { error: 'foo', authenticated: false, user: {} }
    const user = { foo: 'bar' }
    const newState = authReducer(initialState, { type: types.AUTH_USER, payload: user })
    expect(newState).toEqual({ error: '', authenticated: true, user })
  })

  it('UNAUTH_USER should clear authenticated and user', () => {
    const user = { foo: 'bar' }
    const initialState = { authenticated: true, user }
    const newState = authReducer(initialState, { type: types.UNAUTH_USER })
    expect(newState).toEqual({ authenticated: false, user: {} })
  })

  it('AUTH_ERROR should set error message', () => {
    const initialState = { error: '' }
    const newState = authReducer(initialState, { type: types.AUTH_ERROR, payload: 'danger! danger!' })
    expect(newState).toEqual({ error: 'danger! danger!' })
  })

  it('CLEAR_AUTH_ERROR should reset error message', () => {
    const initialState = { error: 'danger! danger!' }
    const newState = authReducer(initialState, { type: types.CLEAR_AUTH_ERROR, payload: 'danger! danger!' })
    expect(newState).toEqual({ error: '' })
  })
})
