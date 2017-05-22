import React, { Component } from 'react'
import { connect } from 'react-redux'
import PublicNavbar from '../PublicNavbar'
import UserNavbar from '../UserNavbar'
import { PropTypes } from 'prop-types'
import { Header } from 'semantic-ui-react'

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        {this.props.authenticated ? (<UserNavbar />) : (<PublicNavbar />)}
        <Header as='h1' icon textAlign='center'>
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

NotFoundPage.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(NotFoundPage)
