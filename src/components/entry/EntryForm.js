import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { PropTypes } from 'prop-types'
import { Button, Form } from 'semantic-ui-react'
import SemanticReduxFormField from '../form/SemanticReduxFormField'
import RatingFormField from '../form/RatingFormField'
import DatePickerFormField from '../form/DatePickerFormField'
import ErrorMessage from '../ErrorMessage'
import moment from 'moment'

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
    // TODO: Trigger close
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
            <Field
              defaultValue={this.props.defaultRating}
              component={RatingFormField} name='rating'
              />
          </Form.Field>
          <Form.Field style={{marginLeft: 'auto'}}>
            <label>Date</label>
            <Field
              defaultValue={this.props.defaultDate}
              component={DatePickerFormField}
              name='date'
              />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Notes</label>
          <Field
            defaultValue={this.props.defaultNotes}
            component={SemanticReduxFormField}
            as={Form.TextArea}
            name='note'
            placeholder={'How\'d the day go?'} />
        </Form.Field>
        <Button type='submit' primary>Save</Button>
      </Form>
    )
  }
}

EntryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  defaultRating: PropTypes.number,
  defaultNotes: PropTypes.string,
  defaultDate: PropTypes.instanceOf(moment)
}

export default connect()(form(EntryForm))
