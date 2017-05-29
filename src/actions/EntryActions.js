import { errorHandler, cookie } from './utils'
import axios from 'axios'
import { LOAD_ENTRIES,
         OPEN_ENTRY_MODAL,
         CLOSE_ENTRY_MODAL,
         ENTRY_API_ERROR,
         CREATE_ENTRY,
         DELETE_ENTRY,
         EDIT_ENTRY } from './types'

const API_URL = 'http://localhost:5000'

export const loadEntries = () => (dispatch) =>
  axios.get(`${API_URL}/entry`, {
    headers: { 'Authorization': 'Bearer ' + cookie.get('token') }
  })
  .then(response => {
    if (response.data.status !== 'success') {
      return errorHandler(dispatch, response, ENTRY_API_ERROR)
    }
    dispatch({ type: LOAD_ENTRIES, payload: response.data.data })
  })
  .catch((error) => {
    errorHandler(dispatch, error, ENTRY_API_ERROR)
  })

export function openEntryModal (defaultValues) {
  return function (dispatch) {
    dispatch({
      type: OPEN_ENTRY_MODAL,
      payload: defaultValues
    })
  }
}

export function closeEntryModal () {
  return function (dispatch) {
    dispatch({
      type: CLOSE_ENTRY_MODAL
    })
  }
}

export const createEntry = ({ date, rating, notes }) => (dispatch) =>
  axios.post(`${API_URL}/entry`, { date, rating, notes },
    { headers: { 'Authorization': 'Bearer ' + cookie.get('token') } }
  )
  .then(response => {
    if (response.data.status !== 'success') {
      return errorHandler(dispatch, response, ENTRY_API_ERROR)
    }
    dispatch({ type: CREATE_ENTRY, payload: response.data.data })
  })
  .catch((error) => {
    if (error) {
      errorHandler(dispatch, error, ENTRY_API_ERROR)
    }
  })

export const editEntry = ({ id, date, rating, notes }) => (dispatch) => {
  // Set rating to NULL if zero (to clear rating)
  rating = rating === 0 ? null : rating
  return axios.put(`${API_URL}/entry/${id}`, { date, rating, notes },
    { headers: { 'Authorization': 'Bearer ' + cookie.get('token') } }
  )
  .then(response => {
    if (response.data.status !== 'success') {
      return errorHandler(dispatch, response, ENTRY_API_ERROR)
    }
    dispatch({ type: EDIT_ENTRY, payload: response.data.data })
  })
  .catch((error) => {
    if (error) {
      errorHandler(dispatch, error, ENTRY_API_ERROR)
    }
  })
}

export const deleteEntry = (id) => (dispatch) =>
  axios.delete(`${API_URL}/entry/${id}`, {
    headers: { 'Authorization': 'Bearer ' + cookie.get('token') }
  })
  .then(response => {
    if (response.data.status !== 'success') {
      return errorHandler(dispatch, response, ENTRY_API_ERROR)
    }
    dispatch({ type: DELETE_ENTRY, id })
  })
  .catch((error) => {
    if (error) {
      errorHandler(dispatch, error, ENTRY_API_ERROR)
    }
  })
