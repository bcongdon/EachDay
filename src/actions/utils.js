import Cookies from 'universal-cookie'
import map from 'lodash.map'

const cookie = new Cookies()
export { cookie }

export const API_URL = process.env.API_BASE_URL

export function formatErrorObject (err) {
  let messages = map(err, (key, msg) => {
    return `${msg}: ${key}`
  })
  return messages.join(', ')
}

export function errorHandler (dispatch, error, type) {
  let errorMessage = ''
  if (!error.response) {
    errorMessage = 'There was an error connecting the EachDay server.'
  } else {
    const data = error.response.data
    if (data && data.error) {
      // Support error text for validation errors
      errorMessage = typeof data.error === 'string' ? data.error : formatErrorObject(data.error)
    } else {
      errorMessage = 'Something went wrong.'
    }
  }

  dispatch({
    type: type,
    payload: errorMessage
  })
  return Promise.resolve()
}
