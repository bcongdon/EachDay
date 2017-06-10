import { combineReducers } from 'redux'
import authReducer from './AuthReducers'
import entryReducer from './EntryReducers'
import profileReducers from './ProfileReducers'
import formReducer from './FormReducers'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  auth: authReducer,
  entry: entryReducer,
  form: formReducer,
  routing: routerReducer,
  profile: profileReducers
})

export default rootReducer
