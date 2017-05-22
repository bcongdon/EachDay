import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NotFoundPage from './components/pages/NotFoundPage'

import HomePage from './components/pages/HomePage'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Dashboard from './components/Dashboard'
import RequireAuth from './components/auth/require-auth'

export default (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
    <Route path='/dashboard' component={RequireAuth(Dashboard)} />

    <Route path='*' component={NotFoundPage} />
  </Switch>
)
