import React, { Component } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { Menu, Grid, Dropdown } from 'semantic-ui-react'
import './PublicNavbar.css'

class PublicNavbar extends Component {
  render () {
    return (
      <Grid>
        <Grid.Row className='computer tablet only'>
          <Menu borderless style={{width: '100%', marginLeft: 15, marginRight: 15}}>
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
        </Grid.Row>
        <Grid.Row className='mobile only'>
          <Menu borderless style={{width: '100%', marginLeft: 15, marginRight: 15}}>
            <Menu.Item>
              <Link to='/' className='navbar-logo-link'>
                <Logo />
              </Link>
            </Menu.Item>
            <Menu.Menu position='right' />
            <Dropdown pointing='top right' item icon='content'>
              <Dropdown.Menu>
                <Dropdown.Item><Link to='/register'>Sign Up</Link></Dropdown.Item>
                <Dropdown.Item><Link to='/login'>Log In</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Grid.Row>
      </Grid>
    )
  }
}

export default PublicNavbar
