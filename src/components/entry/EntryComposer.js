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
    defaultRating: PropTypes.any,
    defaultNotes: PropTypes.any,
    defaultDate: PropTypes.any,
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
    const hasDefault = defaultDate || defaultNotes || defaultRating
    const actionText = hasDefault ? 'Edit' : 'Create'
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openEntryModal, closeEntryModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryComposer)
