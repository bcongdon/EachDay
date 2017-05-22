import React, { Component } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'
import './PublicNavbar.css'

class PublicNavbar extends Component {
  render() {
    return (
      <Menu size='large' borderless>
        <Menu.Item>
          <Link to='/' className='navbar-logo-link'>
            <Logo />
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/register'>
              <Button primary>Sign Up</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/login'>
              <Button primary>Log In</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default PublicNavbar
