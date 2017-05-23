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
    return (
      <Modal open={this.props.open} onClose={this.handleClose} trigger={this.props.trigger}>
        <Modal.Header>Create an Entry</Modal.Header>
        <Modal.Content>
          <EntryForm
            defaultRating={this.props.defaultRating}
            defaultNotes={this.props.defaultNotes}
            defaultDate={this.props.defaultDate} />
        </Modal.Content>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    open: state.entry.entryModalOpen,
    defaultRating: state.entry.defaultRating,
    defaultNotes: state.entry.defaultNotes,
    defaultDate: state.entry.defaultDate
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openEntryModal, closeEntryModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryComposer)
