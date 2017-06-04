import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { loginUser, clearAuthError } from '../../actions'
import { Button, Form } from 'semantic-ui-react'
import SemanticReduxFormField from '../form/SemanticReduxFormField'
import ErrorMessage from '../ErrorMessage'

const form = reduxForm({
  form: 'login'
})

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (formProps) {
    this.props.loginUser(formProps)
  }

  componentWillMount () {
    this.props.clearAuthError()
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
      <Form error warning onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        {this.props.authenticated ? (<Redirect push to='/dashboard' />) : null}
        <Form.Field>
          <label>Email</label>
          <Field component={SemanticReduxFormField} as={Form.Input} name='email' placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Field component={SemanticReduxFormField} as={Form.Input} name='password' placeholder='Password' type='password' />
        </Form.Field>
        <Button type='submit' primary>Log In</Button>
        {this.renderAlert()}
      </Form>
    )
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearAuthError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
    message: state.auth.message
  }
}

export default connect(mapStateToProps, { loginUser, clearAuthError })(form(LoginForm))
