import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Logout from './auth/Logout'

class App extends Component {
  render() {
    return (
      <div>
        <p>Header here</p>

        <Logout />
        <div className='container'>
          {this.props.children}
        </div>

        <p>Footer here</p>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default App
