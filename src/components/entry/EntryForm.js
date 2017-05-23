import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { PropTypes } from 'prop-types'
import { Button, Form, Rating, Message } from 'semantic-ui-react'
import SemanticReduxFormField from '../form/SemanticReduxFormField'
import RatingFormField from '../form/RatingFormField'
import DatePickerFormField from '../form/DatePickerFormField'
import ErrorMessage from '../ErrorMessage'


const form = reduxForm({
  form: 'create-entry',
  validate
})

function validate(formProps) {
  const errors = {}

  // TODO: Validation code

  return errors
}

class EntryForm extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(formProps) {
    // TODO: Trigger action
  }

  renderAlert() {
    return (
      <ErrorMessage message='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' />
    )
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Form warning error onSubmit={handleSubmit(this.handleFormSubmit)}>
        {this.renderAlert()}
        <Form.Group>
          <Form.Field>
            <label>Rating</label>
            <Field component={RatingFormField} name='rating' />
          </Form.Field>
          <Form.Field style={{marginLeft: 'auto'}}>
            <label>Date</label>
            <Field component={DatePickerFormField} name='date' />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Notes</label>
          <Field component={SemanticReduxFormField} as={Form.TextArea} name='name' placeholder={'How\'d the day go?'} />
        </Form.Field>
        <Button type='submit' primary>Save</Button>
      </Form>
    )
  }
}

EntryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default connect()(form(EntryForm))
