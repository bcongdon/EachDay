import React, { Component } from 'react'
import { Card, Grid, Segment, Header } from 'semantic-ui-react'
import UserNavbar from '../components/UserNavbar'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Gravatar from '../components/Gravatar'
import ProfileForm from '../components/ProfileForm'

class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        <UserNavbar />
        <Grid style={{maxWidth: 900, margin: '0 auto'}} centered textAlign='left'>
          <Grid.Column width={5} style={{minWidth: 200}}>
            <Card>
              <Gravatar email={this.props.user.email} size={720} avatar={false} />
              <Card.Content>
                <Card.Header>{this.props.user.name}</Card.Header>
                <Card.Meta>Joined in 2017</Card.Meta>
                <Card.Description>{this.props.user.name} has composed {5} entries on EveryDay.</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column floated='right' computer={10} tablet={10} mobile={16}>
            <Segment>
              <Header size='medium'>Edit Profile</Header>
              <ProfileForm initialValues={this.props.user} />
            </Segment>
          </Grid.Column>
        </Grid>
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
