import { errorHandler, cookie, API_URL } from './utils'
import axios from 'axios'
import { USER_UPDATE,
         CLEAR_PROFILE_API_ERROR,
         PROFILE_API_ERROR } from './types'

export const updateProfile = ({ id, email, name, new_password, password }) => (dispatch) => {
  // Clear outstanding errors
  dispatch({ type: CLEAR_PROFILE_API_ERROR })
  return axios.put(`${API_URL}/user`,
    { email, name, new_password, password },
    {
      headers: { 'Authorization': 'Bearer ' + cookie.get('token') }
    }
  )
  .then(response => {
    if (response.data.status !== 'success') {
      return errorHandler(dispatch, response, PROFILE_API_ERROR)
    }
    dispatch({ type: USER_UPDATE, payload: response.data.data })
  })
  .catch((error) => {
    errorHandler(dispatch, error, PROFILE_API_ERROR)
  })
}
