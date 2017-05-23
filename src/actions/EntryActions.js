import { errorHandler } from './utils'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { LOAD_ENTRIES,
         OPEN_ENTRY_MODAL,
         CLOSE_ENTRY_MODAL,
         ENTRY_ERROR,
         ENTRY_API_ERROR,
         CREATE_ENTRY,
         EDIT_ENTRY } from './types'
const cookie = new Cookies()

const API_URL = 'http://localhost:5000'
const CLIENT_ROOT_URL = 'http://localhost:9000'

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
        errorHandler(dispatch, error.response, ENTRY_API_ERROR)
      }
    })
  }
}

export function openEntryModal(defaultValues) {
  return function(dispatch) {
    dispatch({
      type: OPEN_ENTRY_MODAL,
      payload: defaultValues
    })
  }
}

export function closeEntryModal() {
  return function(dispatch) {
    dispatch({
      type: CLOSE_ENTRY_MODAL
    })
  }
}

export function createEntry({ date, rating, notes }) {
  return function(dispatch) {
    axios.post(`${API_URL}/entry`, { date, rating, notes })
    .then(response => {
      if (response.data.status !== 'success') {
        errorHandler(dispatch, response, ENTRY_API_ERROR)
      }
      dispatch({ type: CREATE_ENTRY, payload: response.data.data })
    })
    .catch((error) => {
      if (error) {
        errorHandler(dispatch, error, ENTRY_API_ERROR)
      }
    })
  }
}

export function editEntry({ id, date, rating, notes }) {
  return function(dispatch) {
  }
}
