import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './routes'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
import Cookies from 'universal-cookie'
import { AUTH_USER } from './actions/types'
import App from './components/App'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = (new Cookies()).get('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        {routes}
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
)
