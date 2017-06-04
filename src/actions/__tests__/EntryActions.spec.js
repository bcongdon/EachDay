import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../EntryActions'
import * as types from '../types'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'
import axios from 'axios'
import expect from 'expect'

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

axios.defaults.adapter = httpAdapter

jest.mock('universal-cookie')

describe('Entry action creators', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('fetches entries correctly', () => {
    const payload = [{ id: 1, notes: 'hi', rating: 3 }]
    const endpoint = nock('http://localhost:5000')
      .get('/entry')
      .reply(200, { status: 'success', data: payload })

    const expectedActions = [
      { type: types.LOAD_ENTRIES, payload: payload }
    ]
    const store = mockStore({})

    return store.dispatch(actions.loadEntries())
      .then(() => {
        expect(endpoint.isDone()).toBeTruthy()
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('edits entries correctly', () => {
    const payload = { id: 1, notes: 'hi', rating: 3 }
    const endpoint = nock('http://localhost:5000')
      .put('/entry/1')
      .reply(200, { status: 'success', data: payload })

    const expectedActions = [
      { type: types.EDIT_ENTRY, payload: payload }
    ]
    const store = mockStore({})

    return store.dispatch(actions.editEntry(payload))
      .then(() => {
        expect(endpoint.isDone()).toBeTruthy()
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('deletes entries correctly', () => {
    const id = 1
    const endpoint = nock('http://localhost:5000')
      .delete('/entry/1')
      .reply(200, { status: 'success' })

    const expectedActions = [
      { type: types.DELETE_ENTRY, id }
    ]
    const store = mockStore({})

    return store.dispatch(actions.deleteEntry(id))
      .then(() => {
        expect(endpoint.isDone()).toBeTruthy()
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should dispatch error when entry loading fails', () => {
    const msg = 'api failed'
    const endpoint = nock('http://localhost:5000')
      .get('/entry')
      .reply(400, { status: 'error', error: msg })

    const expectedActions = [
      { type: types.ENTRY_API_ERROR, payload: msg }
    ]
    const store = mockStore({})

    return store.dispatch(actions.loadEntries())
      .then(() => {
        expect(endpoint.isDone()).toBeTruthy()
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should trigger OPEN_ENTRY_MODAL with default values', () => {
    const defaultValues = { foo: 'bar' }
    const expectedActions = [
      { type: types.OPEN_ENTRY_MODAL, payload: defaultValues }
    ]
    const store = mockStore({})

    return store.dispatch(actions.openEntryModal(defaultValues))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should trigger CLOSE_ENTRY_MODAL', () => {
    const expectedActions = [
      { type: types.CLOSE_ENTRY_MODAL }
    ]
    const store = mockStore({})

    return store.dispatch(actions.closeEntryModal())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
