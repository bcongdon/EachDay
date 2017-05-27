import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ErrorMessage from '../ErrorMessage'

it('renders correctly', () => {
  const message = shallow(
    <ErrorMessage message='foo' />
  )
  expect(toJson(message)).toMatchSnapshot()
})

it('renders correctly with custom header', () => {
  const message = shallow(
    <ErrorMessage message='foo' header='Something blew up!' />
  )
  expect(toJson(message)).toMatchSnapshot()
})

it('renders correctly with compact', () => {
  const message = shallow(
    <ErrorMessage message='foo' compact />
  )
  expect(toJson(message)).toMatchSnapshot()
})
