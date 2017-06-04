import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { push } from 'react-router-redux'
import { errorHandler, cookie } from './utils'
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER,
         CLEAR_AUTH_ERROR } from './types'

const API_URL = process.env.API_BASE_URL

export const loginUser = ({ email, password }) => (dispatch) =>
  axios.post(`${API_URL}/login`, { email, password })
  .then(response => {
    cookie.set('token', response.data.auth_token, { path: '/' })
    let payload = jwtDecode(response.data.auth_token)
    dispatch({ type: AUTH_USER, payload: payload })
    dispatch(push('/dashboard'))
  })
  .catch((error) => {
    errorHandler(dispatch, error, AUTH_ERROR)
  })

export const registerUser = ({ email, password, name }) => (dispatch) =>
  axios.post(`${API_URL}/register`, { email, password, name })
  .then(response => {
    if (response.data.status !== 'success') {
      errorHandler(dispatch, response, AUTH_ERROR)
    }
    cookie.set('token', response.data.auth_token, { path: '/' })
    let payload = jwtDecode(response.data.auth_token)
    dispatch({ type: AUTH_USER, payload: payload })
    dispatch(push('/dashboard'))
  })
  .catch((error) => {
    errorHandler(dispatch, error, AUTH_ERROR)
  })

export const logoutUser = () => (dispatch) => {
  const token = cookie.get('token')
  cookie.remove('token', { path: '/' })

  dispatch(push('/'))
  dispatch({ type: UNAUTH_USER })

  // Logout request so current auth_token is blacklisted
  return axios.post(`${API_URL}/logout`, {}, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
}

export const clearAuthError = () => (dispatch) => {
  dispatch({ type: CLEAR_AUTH_ERROR })
  return Promise.resolve()
}
