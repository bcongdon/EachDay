import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import Gravatar from './Gravatar'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
import { PropTypes } from 'prop-types'

class UserNavbar extends Component {
  constructor(props) {
    super(props)
    this.logoutClick = this.logoutClick.bind(this)
  }

  getTrigger() {
    return (
      <span>
        <Gravatar email={this.props.user.email} /> {this.props.user.name}
      </span>
    )
  }

  logoutClick(event, data) {
    this.props.logoutUser()
  }

  profileClick(event, data) {

  }

  render() {
    return (
      <Menu size='large' borderless>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Dropdown trigger={this.getTrigger()} pointing='top left' icon={null}>
              <Dropdown.Menu>
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
  logoutUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { logoutUser })(UserNavbar)
