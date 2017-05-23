import { OPEN_ENTRY_MODAL,
         CLOSE_ENTRY_MODAL,
         CREATE_ENTRY,
         EDIT_ENTRY,
         LOAD_ENTRIES,
         ENTRY_API_ERROR } from '../actions/types'

const INITIAL_STATE = { entries: [], entryModalOpen: false, initialModalValues: {}, error: '' }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_ENTRY_MODAL:
      return { ...state, initialModalValues: action.payload, entryModalOpen: true }
    case CLOSE_ENTRY_MODAL:
      return { ...state, initialModalValues: {}, entryModalOpen: false }
    case LOAD_ENTRIES:
      return { ...state, entries: action.payload, error: '' }
    case CREATE_ENTRY:
      return { ...state, entries: [...state.entries, action.payload], error: '' }
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
    case ENTRY_API_ERROR:
      return { ...state, error: action.payload }
  }

  return state
}
