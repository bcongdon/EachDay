import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Container } from 'semantic-ui-react'
import './HomePage.css'
import PublicNavbar from '../PublicNavbar'

class HomePage extends Component {
  render() {
    return (
      <div>
        <PublicNavbar />
        <Container text textAlign='center' className='welcome-container'>
          <Header as='h1' icon textAlign='center'>
            <Icon name='checked calendar' circular />
            <Header.Content>
              Journal Something Everyday
            </Header.Content>
            <Header.Subheader>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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

export default HomePage
