import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { registerUser } from '../../actions'
import { Redirect } from 'react-router'
import { PropTypes } from 'prop-types'
import { Button, Form } from 'semantic-ui-react'
import SemanticReduxFormField from '../SemanticReduxFormField'

const form = reduxForm({
  form: 'register',
  validate
})

function validate(formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }

  return errors
}

class Register extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps)
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
        {this.props.authenticated ? (<Redirect push to='/dashboard' />) : null}
        {this.renderAlert()}
        <Form.Group>
          <Form.Field>
            <label>Email</label>
            <Field component={SemanticReduxFormField} as={Form.Input} name='email' placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Field component={SemanticReduxFormField} as={Form.Input} name='password' placeholder='Password' type='password' />
          </Form.Field>
        </Form.Group>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, { registerUser })(form(Register))
