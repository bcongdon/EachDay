import Cookies from 'universal-cookie'

const cookie = new Cookies()
export { cookie }

export function errorHandler (dispatch, error, type) {
  let errorMessage = ''
  if (!error.response) {
    errorMessage = 'There was an error connecting the Everyday server.'
  } else {
    const data = error.response.data
    if (data && data.error) {
      // TODO Support error text for validation errors
      errorMessage = typeof data.error === 'string' ? data.error : JSON.stringify(data.error)
    } else {
      errorMessage = 'Something went wrong.'
    }
  }

  dispatch({
    type: type,
    payload: errorMessage
  })
}
