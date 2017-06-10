import { reducer as formReducer } from 'redux-form'
import { USER_UPDATE } from '../actions/types'

export default formReducer.plugin({
  // Clear fields on editProfile form on submit
  editProfile: (state, action) => {
    switch (action.type) {
      case USER_UPDATE:
        return undefined
      default:
        return state
    }
  }
})
