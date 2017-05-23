import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { PropTypes } from 'prop-types'
import { Button, Form, Rating } from 'semantic-ui-react'
import SemanticReduxFormField from '../form/SemanticReduxFormField'
import RatingFormField from '../form/RatingFormField'

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
      <div>
        <span><strong>Error!</strong>Something went wrong... :(</span>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Form warning error onSubmit={handleSubmit(this.handleFormSubmit)}>
        {this.renderAlert()}
        <Form.Field>
          <label>Rating</label>
          <Field component={RatingFormField} as={Rating} name='email' />
        </Form.Field>
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
