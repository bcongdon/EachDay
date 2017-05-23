import { OPEN_ENTRY_MODAL,
         CLOSE_ENTRY_MODAL,
         CREATE_ENTRY,
         EDIT_ENTRY,
         LOAD_ENTRIES } from '../actions/types'

const INITIAL_STATE = { entries: [], entryModalOpen: false, initialModalValues: {} }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_ENTRY_MODAL:
      return { ...state, initialModalValues: action.payload, entryModalOpen: true }
    case CLOSE_ENTRY_MODAL:
      return { ...state, initialModalValues: {}, entryModalOpen: false }
    case LOAD_ENTRIES:
      return { ...state, entries: action.payload }
    case CREATE_ENTRY:
      return { ...state, entries: [...state.entries, action.payload] }
    case EDIT_ENTRY:
      return {
        ...state,
        entries: state.entries.map(e => {
          if (e.id === action.payload.id) {
            return action.payload
          } else {
            return e
          }
        })
      }
  }

  return state
}
