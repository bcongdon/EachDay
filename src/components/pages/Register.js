import React, { Component } from 'react'
import PublicNavbar from '../PublicNavbar'
import RegisterForm from '../auth/RegisterForm'

class Register extends Component {
  render() {
    return (
      <div>
        <PublicNavbar />
        <RegisterForm />
      </div>
    )
  }
}

export default Register
