import expect from 'expect'
import * as types from '../../actions/types'
import entryReducer from '../EntryReducers'

describe('Entry Reducers', () => {
  it('OPEN_ENTRY_MODAL should set initial modal values correctly', () => {
    const initialState = { entryModalOpen: false, initialModalValues: {} }
    const action = { type: types.OPEN_ENTRY_MODAL, payload: { foo: 'bar' } }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ entryModalOpen: true, initialModalValues: { foo: 'bar' } })
  })

  it('CLOSE_ENTRY_MODAL should clear modal values', () => {
    const initialState = { entryModalOpen: true, initialModalValues: { foo: 'bar' } }
    const action = { type: types.CLOSE_ENTRY_MODAL }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ entryModalOpen: false, initialModalValues: {} })
  })

  it('LOAD_ENTRIES should populate entries list', () => {
    const initialState = { entries: [], loading: true }
    const action = { type: types.LOAD_ENTRIES, payload: [{id: 1, rating: 4}] }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ entries: [{id: 1, rating: 4}], loading: false, error: '' })
  })
})
