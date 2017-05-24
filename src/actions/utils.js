import Cookies from 'universal-cookie'

function cookieManager() {
  if (process.env.NODE_ENV === 'test') {
    return new class CookieMock {
      constructor() {
        this.data = {}
      }

      set(k, v) {
        this.data[k] = v
      }

      get(k) {
        return this.data[k]
      }
    }()
  } else {
    return new Cookies()
  }
}
const cookie = cookieManager()
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
