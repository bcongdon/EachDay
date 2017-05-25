import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { push } from 'react-router-redux'
import { errorHandler, cookie } from './utils'
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER } from './types'

const API_URL = 'http://localhost:5000'

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
  cookie.remove('token', { path: '/' })

  // TODO: Client request so current auth_token is blacklisted

  dispatch(push('/'))
  dispatch({ type: UNAUTH_USER })
  return Promise.resolve()
}
