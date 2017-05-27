import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Gravatar from '../Gravatar'

it('renders correctly', () => {
  const gravatar = shallow(
    <Gravatar email='foo@bar.com' />
  )
  expect(toJson(gravatar)).toMatchSnapshot()
})

it('renders correctly with custom size', () => {
  const gravatar = shallow(
    <Gravatar email='foo@bar.com' size={720} />
  )
  expect(toJson(gravatar)).toMatchSnapshot()
})
