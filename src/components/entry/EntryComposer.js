import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'
import EntryForm from './EntryForm'

class EntryComposer extends Component {
  render() {
    return (
      <Modal trigger={this.props.trigger}>
        <Modal.Header>Create an Entry</Modal.Header>
        <Modal.Content>
          <EntryForm />
        </Modal.Content>
      </Modal>
    )
  }
}

EntryComposer.propTypes = {
  trigger: PropTypes.element
}

export default EntryComposer
