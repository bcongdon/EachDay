import React, { Component } from 'react'
import PublicNavbar from '../PublicNavbar'
import LoginForm from '../auth/LoginForm'
import { Segment, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Login extends Component {
  render () {
    return (
      <div>
        <PublicNavbar />
        <Grid centered verticalAlign='middle' columns={1}>
          <Grid.Column style={{'maxWidth': 450}}>
            <Segment textAlign='left' stacked secondary>
              <LoginForm />
            </Segment>
            <Segment stacked secondary>
              Don't have an account? Register one <Link to='/register'>here</Link>.
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login
