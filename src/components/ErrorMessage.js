import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'

class ErrorMessage extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    header: PropTypes.string,
    compact: PropTypes.bool
  }

  render() {
    const header = this.props.header === undefined ? 'Something went wrong...' : this.props.header
    return (
      <Message negative compact={this.props.compact}>
        <Message.Header>{header}</Message.Header>
        <p>{this.props.message}</p>
      </Message>
    )
  }
}

export default ErrorMessage
