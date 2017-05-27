import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import RequireAuth from './components/auth/RequireAuth'

export default (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/dashboard' component={RequireAuth(DashboardPage)} />
    <Route path='/profile' component={RequireAuth(ProfilePage)} />

    <Route path='*' component={NotFoundPage} />
  </Switch>
)
