import Cookies from 'universal-cookie'

const cookie = new Cookies()
export { cookie }

export function errorHandler(dispatch, request, type) {
  let errorMessage = ''
  const data = request.data

  if (data && data.error) {
    errorMessage = typeof data.error === 'string' ? data.error : 'Untracked error'
  } else {
    errorMessage = 'Something went wrong.'
  }

  dispatch({
    type: type,
    payload: errorMessage
  })
}
