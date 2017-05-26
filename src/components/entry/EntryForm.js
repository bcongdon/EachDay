import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { PropTypes } from 'prop-types'
import { Button, Form } from 'semantic-ui-react'
import SemanticReduxFormField from '../form/SemanticReduxFormField'
import RatingFormField from '../form/RatingFormField'
import DatePickerFormField from '../form/DatePickerFormField'
import ErrorMessage from '../ErrorMessage'
import { closeEntryModal, createEntry, editEntry } from '../../actions'
import moment from 'moment'

const form = reduxForm({
  form: 'createEntry',
  validate
})

function validate (formProps) {
  const errors = {}

  if (!formProps.date || !moment(formProps.date).isValid()) {
    errors.date = 'Please enter a date'
  }

  return errors
}

class EntryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isNewEntry: PropTypes.bool.isRequired,
    createEntry: PropTypes.func.isRequired,
    closeEntryModal: PropTypes.func.isRequired,
    editEntry: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (formProps) {
    if (this.props.isNewEntry) {
      this.props.createEntry(formProps)
    } else {
      this.props.editEntry(formProps)
    }
    this.props.closeEntryModal()
  }

  renderAlert () {
    if (!this.props.errorMessage) {
      return null
    }

    return (
      <ErrorMessage message={this.props.errorMessage} />
    )
  }

  render () {
    return (
      <Form warning error onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        {this.renderAlert()}
        <Form.Group>
          <Form.Field>
            <label>Rating</label>
            <Field
              component={RatingFormField} clearable name='rating'
              />
          </Form.Field>
          <Form.Field style={{marginLeft: 'auto'}}>
            <label>Date</label>
            <Field
              component={DatePickerFormField}
              name='date'
              />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Notes</label>
          <Field
            component={SemanticReduxFormField}
            as={Form.TextArea}
            name='notes'
            placeholder={'How\'d the day go?'} />
        </Form.Field>
        <Button type='submit' primary>Save</Button>
      </Form>
    )
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.entry.error
  }
}

export default connect(mapStateToProps, { createEntry, closeEntryModal, editEntry })(form(EntryForm))
