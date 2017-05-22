import React, { Component } from 'react'
import Logo from '../Logo'
import { Link } from 'react-router-dom'
import { Button, Menu, Header, Icon, Container } from 'semantic-ui-react'
import './HomePage.css'

class HomePage extends Component {
  render() {
    return (
      <div>
        <Menu size='medium' borderless>
          <Menu.Item><Logo /></Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Link to='/register'>
                <Button primary>Sign Up</Button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Button>Log In</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
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
