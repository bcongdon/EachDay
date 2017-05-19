import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props

    return (
      <button onClick={() => onLogoutClick()} className='btn btn-primary'>
        Logout
      </button>
    )
  }
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func
}

export default Logout
