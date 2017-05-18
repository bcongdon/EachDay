import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import App from './components/App'
import NotFoundPage from './components/pages/NotFoundPage'

import HomePage from './components/pages/HomePage'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/Dashboard'
import RequireAuth from './components/auth/require-auth'

export default (
  <App>
    <Link to='/register'>Foo</Link>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/dashboard' component={RequireAuth(Dashboard)} />

      <Route path='*' component={NotFoundPage} />
    </Switch>
  </App>
)
