import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'
import EntryForm from './EntryForm'
import { openEntryModal, closeEntryModal } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class EntryComposer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    initialModalValues: PropTypes.object,
    closeEntryModal: PropTypes.func,
    trigger: PropTypes.element
  }

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.closeEntryModal()
  }

  render() {
    const { defaultRating, defaultNotes, defaultDate } = this.props
    const actionText = this.props.initialModalValues === {} ? 'Edit' : 'Create'
    return (
      <Modal open={this.props.open} onClose={this.handleClose} trigger={this.props.trigger}>
        <Modal.Header>{actionText} an Entry</Modal.Header>
        <Modal.Content>
          <EntryForm
            initialValues={this.props.initialModalValues} />
        </Modal.Content>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    open: state.entry.entryModalOpen,
    initialModalValues: state.entry.initialModalValues
  }
}

export default connect(mapStateToProps, { openEntryModal, closeEntryModal })(EntryComposer)
