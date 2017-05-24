import Cookies from 'universal-cookie'

const cookie = new Cookies()
export { cookie }

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
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    })
  }
}
