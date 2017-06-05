import expect from 'expect'
import * as types from '../../actions/types'
import profileReducer from '../profile_reducers'

describe('Entry Reducers', () => {
  it('CLEAR_PROFILE_API_ERROR should clear any set errors', () => {
    const initialState = { error: 'foo bar baz' }
    const action = { type: types.CLEAR_PROFILE_API_ERROR }
    const newState = profileReducer(initialState, action)
    expect(newState).toEqual({ error: '' })
  })

  it('PROFILE_API_ERROR should set the given error', () => {
    const initialState = { error: '' }
    const action = { type: types.PROFILE_API_ERROR, payload: 'foo bar baz' }
    const newState = profileReducer(initialState, action)
    expect(newState).toEqual({ error: 'foo bar baz' })
  })
})
