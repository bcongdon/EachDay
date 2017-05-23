import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducers'
import entryReducer from './entry_reducers'

const rootReducer = combineReducers({
  auth: authReducer,
  entry: entryReducer,
  form: formReducer
})

export default rootReducer
