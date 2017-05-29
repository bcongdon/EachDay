import { push } from 'react-router-redux'

export const pushPage = (path) => (dispatch) => {
  dispatch(push(path))
  return Promise.resolve()
}
