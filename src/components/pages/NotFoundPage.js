import React, { Component } from 'react'
import PublicNavbar from '../PublicNavbar'
import { Header } from 'semantic-ui-react'

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <PublicNavbar />
        <Header as='h1' icon textAlign='Center'>
          <Header.Content>
            404 - Not Found
          </Header.Content>
          <Header.Subheader>
            I'm sorry, the page you were looking for cannot be found!
          </Header.Subheader>
        </Header>
      </div>
    )
  }
}
export default NotFoundPage
