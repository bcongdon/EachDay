import orderBy from 'lodash/orderBy'
import moment from 'moment'
import { OPEN_ENTRY_MODAL,
         CLOSE_ENTRY_MODAL,
         CREATE_ENTRY,
         EDIT_ENTRY,
         DELETE_ENTRY,
         LOAD_ENTRIES,
         ENTRY_API_ERROR,
         START_API_LOAD,
         END_API_LOAD } from '../actions/types'

const INITIAL_STATE = { entries: [], entryModalOpen: false, initialModalValues: {}, error: '', loading: false }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_ENTRY_MODAL:
      return { ...state, initialModalValues: action.payload, entryModalOpen: true }
    case CLOSE_ENTRY_MODAL:
      return { ...state, initialModalValues: {}, entryModalOpen: false }
    case LOAD_ENTRIES:
      return { ...state, entries: action.payload, error: '', loading: false }
    case CREATE_ENTRY:
      return {
        ...state,
        entries: orderBy([...state.entries, action.payload], [(e) => moment(e.date)], ['desc']),
        error: ''
      }
    case EDIT_ENTRY:
      return {
        ...state,
        error: '',
        entries: state.entries.map(e => {
          if (e.id === action.payload.id) {
            return action.payload
          } else {
            return e
          }
        })
      }
    case DELETE_ENTRY:
      return {
        ...state,
        error: '',
        entries: state.entries.filter(e => e.id !== action.id)
      }
    case ENTRY_API_ERROR:
      return { ...state, error: action.payload, loading: false }
    case START_API_LOAD:
      return { ...state, loading: true }
    case END_API_LOAD:
      return { ...state, loading: false }
  }

  return state
}
