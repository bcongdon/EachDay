import React from 'react'
import { UserNavbar } from '../UserNavbar'
import { mount, shallow } from 'enzyme'
import { Menu } from 'semantic-ui-react'
import toJson from 'enzyme-to-json'
jest.mock('universal-cookie')

const user = {
  name: 'foo',
  email: 'bar@baz.com'
}

it('renders correctly', () => {
  const pushPage = jest.fn()
  const logoutUser = jest.fn()
  const navbar = shallow(
    <UserNavbar
      user={user}
      location={{pathname: '/dashboard'}}
      pushPage={pushPage}
      logoutUser={logoutUser}
      />
  )
  expect(toJson(navbar)).toMatchSnapshot()
})

it('should reload dashboard window on a simulated refresh', () => {
  const pushPage = jest.fn()
  const logoutUser = jest.fn()
  const navbar = mount(
    <UserNavbar
      user={user}
      location={{pathname: '/dashboard'}}
      pushPage={pushPage}
      logoutUser={logoutUser}
      />
  )
  global.location.reload = jest.fn()
  navbar.find(Menu.Item).first().simulate('click')
  expect(global.location.reload).toBeCalled()
  expect(pushPage).not.toBeCalled()
})

it('should push page on a non-dashboard click', () => {
  const pushPage = jest.fn()
  const logoutUser = jest.fn()
  const navbar = mount(
    <UserNavbar
      user={user}
      location={{pathname: '/'}}
      pushPage={pushPage}
      logoutUser={logoutUser}
      />
  )
  global.location.reload = jest.fn()
  navbar.find(Menu.Item).first().simulate('click')
  expect(global.location.reload).not.toBeCalled()
  expect(pushPage).toBeCalled()
})
