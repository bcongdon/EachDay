import { CLEAR_PROFILE_API_ERROR,
         PROFILE_API_ERROR } from '../actions/types'

const INITIAL_STATE = { error: '' }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLEAR_PROFILE_API_ERROR:
      return { ...state, error: '' }
    case PROFILE_API_ERROR:
      return { ...state, error: action.payload }
  }
  return state
}
