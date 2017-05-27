import React, { Component } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import './PublicNavbar.css'

class PublicNavbar extends Component {
  render () {
    return (
      <Menu stackable borderless>
        <Menu.Item>
          <Link to='/' className='navbar-logo-link'>
            <Logo />
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/register'>Sign Up</Link>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Item>
          <Link to='/login'>Log In</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default PublicNavbar
