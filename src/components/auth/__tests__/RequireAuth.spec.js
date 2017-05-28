import React, { Component } from 'react'
import RequireAuth from '../RequireAuth'
import { mount } from 'enzyme'
import { PropTypes } from 'prop-types'
import toJson from 'enzyme-to-json'
import configureStore from 'redux-mock-store'
const middlewares = []
const mockStore = configureStore(middlewares)

class TestComponent extends Component {
  render () {
    return <p>Testing</p>
  }
}

it('should push to login page without authentication', () => {
  const Composed = RequireAuth(TestComponent)
  const history = jest.fn()
  history.push = jest.fn()

  const context = {
    router: { history }
  }
  const childContextTypes = {
    router: PropTypes.object
  }

  var reqAuth = mount(
    <Composed store={mockStore({auth: {authenticated: false}})} />,
    { context, childContextTypes }
  )
  expect(history.push).toBeCalled()
  expect(toJson(reqAuth)).toMatchSnapshot()
})

it('should not change routes when user is authenticated', () => {
  const Composed = RequireAuth(TestComponent)
  const history = jest.fn()
  history.push = jest.fn()

  const context = {
    router: { history }
  }
  const childContextTypes = {
    router: PropTypes.object
  }

  var reqAuth = mount(
    <Composed store={mockStore({auth: {authenticated: true}})} />,
    { context, childContextTypes }
  )
  expect(history.push).not.toBeCalled()
  expect(toJson(reqAuth)).toMatchSnapshot()
})
