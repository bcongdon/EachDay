import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { loginUser } from '../../actions'
import { Button, Form } from 'semantic-ui-react'
import SemanticReduxFormField from '../form/SemanticReduxFormField'

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

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      )
    }
  }

  render () {
    return (
      <Form error warning onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        {this.props.authenticated ? (<Redirect push to='/dashboard' />) : null}
        {this.renderAlert()}
        <Form.Field>
          <label>Email</label>
          <Field component={SemanticReduxFormField} as={Form.Input} name='email' placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Field component={SemanticReduxFormField} as={Form.Input} name='password' placeholder='Password' type='password' />
        </Form.Field>
        <Button type='submit' primary>Log In</Button>
      </Form>
    )
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { loginUser })(form(LoginForm))
