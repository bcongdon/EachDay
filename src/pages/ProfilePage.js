import React, { Component } from 'react'
import { Container, Card } from 'semantic-ui-react'
import UserNavbar from '../components/UserNavbar'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Gravatar from '../components/Gravatar'

class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        <UserNavbar />
        <Container>
          <Card>
            <Gravatar email={this.props.user.email} size={720} avatar={false} />
            <Card.Content>
              <Card.Header>{this.props.user.name}</Card.Header>
              <Card.Meta>Joined in 2017</Card.Meta>
              <Card.Description>{this.props.user.name} has composed {5} entries on EveryDay.</Card.Description>
            </Card.Content>
          </Card>
        </Container>
      </div>
    )
  }
}

function mapPropsToState (state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapPropsToState)(ProfilePage)
