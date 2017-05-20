import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { registerUser } from '../../actions'
import { Redirect } from 'react-router'
import { PropTypes } from 'prop-types'

const form = reduxForm({
  form: 'register',
  validate
})

const renderField = field => (
  <div>
    <input className='form-control' {...field.input} />
    {field.touched && field.error && <div className='error'>{field.error}</div>}
  </div>
)

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
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        {this.props.authenticated ? (<Redirect push to='/dashboard' />) : null}
        {this.renderAlert()}
        <div className='row'>
          <div className='col-md-12'>
            <label>Email</label>
            <Field name='email' className='form-control' component={renderField} type='text' />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <label>Password</label>
            <Field name='password' className='form-control' component={renderField} type='password' />
          </div>
        </div>
        <button type='submit' className='btn btn-primary'>Register</button>
      </form>
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
