import React, { Component } from 'react'
import UserNavbar from '../components/UserNavbar'
import Dashboard from '../components/Dashboard'
import { PropTypes } from 'prop-types'

export class DashboardPage extends Component {
  render () {
    return (
      <div>
        <UserNavbar location={this.props.location} />
        <Dashboard />
      </div>
    )
  }
}

DashboardPage.propTypes = {
  location: PropTypes.object
}

export default DashboardPage
