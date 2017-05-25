import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import routes from './routes'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
import Cookies from 'universal-cookie'
import { AUTH_USER } from './actions/types'
import jwtDecode from 'jwt-decode'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

const history = createHistory()

const createStoreWithMiddleware = applyMiddleware(reduxThunk, routerMiddleware(history))(createStore)
const store = createStoreWithMiddleware(reducers)

const token = (new Cookies()).get('token')

// Check if token is available and non-expired
if (token && jwtDecode(token) && jwtDecode(token).exp > Math.floor(Date.now() / 1000)) {
  store.dispatch({ type: AUTH_USER, payload: jwtDecode(token) })
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
