import React, { Component } from 'react'
import PublicNavbar from '../PublicNavbar'
import RegisterForm from '../auth/RegisterForm'
import { Segment, Grid } from 'semantic-ui-react'

class Register extends Component {
  render() {
    return (
      <div>
        <PublicNavbar />
        <Grid centered verticalAlign='middle' columns={1}>
          <Grid.Column style={{'maxWidth': 450}}>
            <Segment textAlign='left' stacked secondary>
              <RegisterForm />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Register