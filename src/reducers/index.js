import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducers'
import entryReducer from './entry_reducers'
import profileReducers from './profile_reducers.js'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  auth: authReducer,
  entry: entryReducer,
  form: formReducer,
  routing: routerReducer,
  profile: profileReducers
})

export default rootReducer
