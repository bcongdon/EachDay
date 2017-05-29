import { push } from 'react-router-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../RouterActions'

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

describe('router actions', () => {
  it('should push page', () => {
    const store = mockStore({})
    const expectedActions = [
      push('/foo')
    ]

    store.dispatch(actions.pushPage('/foo'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
