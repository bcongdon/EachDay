import { OPEN_ENTRY_MODAL,
         CLOSE_ENTRY_MODAL } from '../actions/types'

const INITIAL_STATE = { entryModalOpen: false, defaultRating: '', defaultDate: '', defaultNotes: '' }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_ENTRY_MODAL:
      return {
        ...state,
        entryModalOpen: true,
        defaultRating: action.payload.rating,
        defaultDate: action.payload.date,
        defaultNotes: action.payload.notes
      }
    case CLOSE_ENTRY_MODAL:
      return { ...state, entryModalOpen: false, defaultRating: '', defaultDate: '', defaultNotes: '' }
  }

  return state
}
