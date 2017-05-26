import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions'
import { PropTypes } from 'prop-types'

class Logout extends Component {
  render () {
    return (
      <button onClick={this.props.logoutUser} className='btn btn-primary'>
        Logout
      </button>
    )
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
}

export default connect(null, { logoutUser })(Logout)
