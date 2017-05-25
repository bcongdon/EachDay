import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducers'
import entryReducer from './entry_reducers'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  auth: authReducer,
  entry: entryReducer,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
