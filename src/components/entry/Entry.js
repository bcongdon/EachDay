import React, { Component } from 'react'
import { Item, Segment, Label, Icon, Rating } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'
import moment from 'moment'

class Entry extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    notes: PropTypes.string,
    date: PropTypes.instanceOf(moment)
  }

  render() {
    return (
      <Segment textAlign='left' style={{maxWidth: 600}}>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{this.props.date.format('YYYY-MM-DD')}</Item.Header>
              <Item.Meta><Rating disabled maxRating={5} rating={this.props.rating} /></Item.Meta>
              <Item.Description>
                {this.props.notes}
              </Item.Description>
            </Item.Content>
            <Label attached='bottom right' as='a' ><Icon name='edit' /></Label>
          </Item>
        </Item.Group>
      </Segment>
    )
  }
}

export default Entry
