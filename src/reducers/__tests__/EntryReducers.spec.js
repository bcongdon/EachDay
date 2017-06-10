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

  it('ENTRY_API_ERROR should set error field and set loading to false', () => {
    const initialState = { error: '', loading: true }
    const action = { type: types.ENTRY_API_ERROR, payload: 'danger!' }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ loading: false, error: 'danger!' })
  })

  it('START_API_LOAD should set loading to true', () => {
    const initialState = { loading: false }
    const action = { type: types.START_API_LOAD }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ loading: true })
  })

  it('END_API_LOAD should set loading to false', () => {
    const initialState = { loading: true }
    const action = { type: types.END_API_LOAD }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ loading: false })
  })
})
