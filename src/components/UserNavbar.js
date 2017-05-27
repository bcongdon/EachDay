import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import Gravatar from './Gravatar'
import { connect } from 'react-redux'
import { logoutUser, pushPage } from '../actions'
import { PropTypes } from 'prop-types'
import Logo from './Logo'

class UserNavbar extends Component {
  constructor (props) {
    super(props)
    this.logoutClick = this.logoutClick.bind(this)
    this.profileClick = this.profileClick.bind(this)
    this.dashboardClick = this.dashboardClick.bind(this)
  }

  getTrigger () {
    return (
      <span>
        <Gravatar email={this.props.user.email} /> {this.props.user.name}
      </span>
    )
  }

  logoutClick (event, data) {
    this.props.logoutUser()
  }

  profileClick (event, data) {
    this.props.pushPage('/profile')
  }

  dashboardClick (event, data) {
    if (this.props.location && this.props.location.pathname === '/dashboard') {
      window.location.reload()
    } else {
      this.props.pushPage('/dashboard')
    }
  }

  render () {
    return (
      <Menu size='large' borderless>
        <Menu.Item onClick={this.dashboardClick}>
          <Logo />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Dropdown trigger={this.getTrigger()} pointing='top right' icon={null}>
              <Dropdown.Menu>
                <Dropdown.Item text='Journal' icon='calendar outline' onClick={this.dashboardClick} />
                <Dropdown.Item text='Account' icon='user' onClick={this.profileClick} />
                <Dropdown.Item text='Sign Out' icon='sign out' onClick={this.logoutClick} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

UserNavbar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,    // Action to call to logout user
  pushPage: PropTypes.func.isRequired,      // Action to push page update
  location: PropTypes.object                // Used to determine if force refresh is needed
}

function mapStateToProps (state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { logoutUser, pushPage })(UserNavbar)
