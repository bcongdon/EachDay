import expect from 'expect'
import * as types from '../../actions/types'
import entryReducer from '../EntryReducers'

const entry1 = { id: 1, date: '2015-01-01', rating: 5, notes: 'Hello 2015!' }
const entry2 = { id: 2, date: '2016-01-01', rating: 6, notes: 'Hello 2016!' }
const entry3 = { id: 3, date: '2017-01-01', rating: 7, notes: 'Hello 2017!' }

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

  it('CREATE_ENTRY should create an entry from empty state', () => {
    const initialState = { entries: [], error: 'earlier error' }
    const action = { type: types.CREATE_ENTRY, payload: entry1 }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ entries: [entry1], error: '' })
  })

  it('CREATE_ENTRY should sort new entries in descending date order', () => {
    const initialState = { entries: [entry3, entry1], error: 'earlier error' }
    const action = { type: types.CREATE_ENTRY, payload: entry2 }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ entries: [entry3, entry2, entry1], error: '' })
  })

  it('EDIT_ENTRY should edit given entry', () => {
    const newEntry1 = { id: 1, date: '2015-01-01', rating: 7, notes: 'This is a new note' }
    const initialState = { entries: [entry3, entry2, entry1] }
    const action = { type: types.EDIT_ENTRY, payload: newEntry1 }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ entries: [entry3, entry2, newEntry1], error: '' })
  })

  it('EDIT_ENTRY should do nothing when entry not found', () => {
    const newEntry4 = { id: 4, date: '2018-01-01', rating: 7, notes: 'Hello 2018!' }
    const initialState = { entries: [entry3, entry2, entry1] }
    const action = { type: types.EDIT_ENTRY, payload: newEntry4 }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ entries: [entry3, entry2, entry1], error: '' })
  })

  it('DELETE_ENTRY should delete given entry', () => {
    const initialState = { entries: [entry3, entry2, entry1] }
    const action = { type: types.DELETE_ENTRY, id: 1 }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ entries: [entry3, entry2], error: '' })
  })

  it('DELETE_ENTRY should do nothing when entry not found', () => {
    const initialState = { entries: [entry3, entry2, entry1] }
    const action = { type: types.DELETE_ENTRY, id: 4 }
    const newState = entryReducer(initialState, action)
    expect(newState).toEqual({ entries: [entry3, entry2, entry1], error: '' })
  })
})
