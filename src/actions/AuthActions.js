import axios from 'axios'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import { errorHandler } from './utils'
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER } from './types'

const API_URL = 'http://localhost:5000'
const CLIENT_ROOT_URL = 'http://localhost:9000'
const cookie = new Cookies()

export function loginUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/login`, { email, password })
    .then(response => {
      cookie.set('token', response.data.auth_token, { path: '/' })
      let payload = jwtDecode(response.data.auth_token)
      dispatch({ type: AUTH_USER, payload: payload })
      window.location.href = CLIENT_ROOT_URL + '/dashboard'
    })
    .catch((error) => {
      if (error) {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      }
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
      let payload = jwtDecode(response.data.auth_token)
      dispatch({ type: AUTH_USER, payload: payload })
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

    window.location.href = CLIENT_ROOT_URL
  }
}
