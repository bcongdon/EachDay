import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { PropTypes } from 'prop-types'
import { Button, Form, Divider } from 'semantic-ui-react'
import SemanticReduxFormField from './form/SemanticReduxFormField'
import ErrorMessage from './ErrorMessage'
import { updateProfile } from '../actions'

const form = reduxForm({
  form: 'editProfile',
  validate
})

function validate (formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address.'
  }

  if (formProps.new_password && formProps.new_password.length < 8) {
    errors.new_password = 'Your new password must be 8 characters or longer.'
  }

  if(!formProps.password) {
    errors.password = 'You must provide your password to edit your account.'
  }

  return errors
}

class EntryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    updateProfile: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (formProps) {
    this.props.updateProfile(formProps)
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
        <Form.Field>
          <label>Email</label>
          <Field component={SemanticReduxFormField} as={Form.Input} name='email' placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <Field component={SemanticReduxFormField} as={Form.Input} name='name' placeholder='What should we call you?' />
        </Form.Field>
        <Form.Field>
          <label>New Password</label>
          <Field component={SemanticReduxFormField} as={Form.Input} name='new_password' placeholder='Password' type='password' />
        </Form.Field>
        <Divider section />
        <Form.Field>
          <label>Password</label>
          <Field component={SemanticReduxFormField} as={Form.Input} name='password' placeholder='Password' type='password' />
        </Form.Field>
        <Button type='submit' primary>Save</Button>
      </Form>
    )
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.profile.error
  }
}

export default connect(mapStateToProps, { updateProfile })(form(EntryForm))
