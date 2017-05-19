import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { loginUser } from '../../actions'

const form = reduxForm({
  form: 'login'
})

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps)
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
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          {this.props.authenticated ? (<Redirect push to='/dashboard' />) : null}
          {this.renderAlert()}
          <div>
            <label>Email</label>
            <Field name='email' className='form-control' component='input' type='text' />
          </div>
          <div>
            <label>Password</label>
            <Field name='password' className='form-control' component='input' type='password' />
          </div>
          <button type='submit' className='btn btn-primary'>Login</button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
    message: state.auth.message
  }
}

export default connect(mapStateToProps, { loginUser })(form(LoginForm))
