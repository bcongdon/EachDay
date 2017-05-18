import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class App extends Component {
  render() {
    return (
      <div>
        <p>Header here</p>

        <div className='container'>
          {this.props.children}
        </div>

        <p>Footer here</p>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
