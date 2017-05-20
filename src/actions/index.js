import axios from 'axios'
import Cookies from 'universal-cookie'
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER,
         LOAD_ENTRIES } from './types'

const API_URL = 'http://localhost:5000'
const CLIENT_ROOT_URL = 'http://localhost:9000'
const cookie = new Cookies()

export function errorHandler(dispatch, error, type) {
  let errorMessage = ''

  if (error.data && error.data.message) {
    errorMessage = JSON.stringify(error.data.message)
  } else {
    errorMessage = JSON.stringify(error.data)
  }

  if (error.status === 403) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    })
    logoutUser()
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    })
  }
}

export function loginUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/login`, { email, password })
    .then(response => {
      cookie.set('token', response.data.auth_token, { path: '/' })
      dispatch({ type: AUTH_USER })
      window.location.href = CLIENT_ROOT_URL + '/dashboard'
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    })
  }
}

export function registerUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/register`, { email, password })
    .then(response => {
      if (response.data.status !== 'success') {
        errorHandler(dispatch, response, AUTH_ERROR)
      }
      cookie.set('token', response.data.auth_token, { path: '/' })
      dispatch({ type: AUTH_USER })
      window.location.href = CLIENT_ROOT_URL + '/dashboard'
    })
    .catch((error) => {
      if (error) {
        errorHandler(dispatch, error, AUTH_ERROR)
      }
    })
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER })
    cookie.remove('token', { path: '/' })

    window.location.href = CLIENT_ROOT_URL + '/login'
  }
}

export function loadEntries() {
  return function(dispatch) {
    axios.get(`${API_URL}/entry`, {
      headers: { 'Authorization': 'Bearer ' + cookie.get('token') }
    })
    .then(response => {
      dispatch({
        type: LOAD_ENTRIES,
        payload: response.data.data
      })
    })
    .catch((error) => {
      if (error) {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      }
    })
  }
}
