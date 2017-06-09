import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './AuthReducers'
import entryReducer from './EntryReducers'
import profileReducers from './ProfileReducers'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  auth: authReducer,
  entry: entryReducer,
  form: formReducer,
  routing: routerReducer,
  profile: profileReducers
})

export default rootReducer
