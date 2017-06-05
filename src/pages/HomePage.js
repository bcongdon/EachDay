import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Container } from 'semantic-ui-react'
import './HomePage.css'
import PublicNavbar from '../components/PublicNavbar'
import UserNavbar from '../components/UserNavbar'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

class HomePage extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired
  }

  render () {
    return (
      <div>
        {this.props.authenticated ? <UserNavbar /> : <PublicNavbar />}
        <Container text textAlign='center' className='welcome-container'>
          <Header as='h1' icon textAlign='center'>
            <Icon name='checked calendar' circular />
            <Header.Content>
              Journal Something EachDay
            </Header.Content>
            <Header.Subheader>
              Get personal insights by writing a small journal entry each day.
            </Header.Subheader>
          </Header>
          <Link to='/register'>
            <Button content='Start Your Journal Now' primary size='large' />
          </Link>
        </Container>
      </div>
    )
  }
}

function mapPropsToState (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapPropsToState)(HomePage)
