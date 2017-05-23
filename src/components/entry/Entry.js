import React, { Component } from 'react'
import { Item, Segment, Label, Icon, Rating } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import { openEntryModal } from '../../actions'
import { connect } from 'react-redux'

class Entry extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    notes: PropTypes.string,
    date: PropTypes.string.isRequired,
    openEntryModal: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.onEditClick = this.onEditClick.bind(this)
  }

  onEditClick() {
    this.props.openEntryModal({
      rating: this.props.rating,
      notes: this.props.notes,
      date: this.props.date
    })
  }

  render() {
    return (
      <Segment textAlign='left' style={{maxWidth: 600}}>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{moment(this.props.date).format('YYYY-MM-DD')}</Item.Header>
              <Item.Meta><Rating disabled maxRating={5} rating={this.props.rating} /></Item.Meta>
              <Item.Description>
                {this.props.notes}
              </Item.Description>
            </Item.Content>
            <Label attached='bottom right' size='small' as='a' onClick={this.onEditClick}>
              Edit <Icon name='edit' />
            </Label>
          </Item>
        </Item.Group>
      </Segment>
    )
  }
}

export default connect(null, { openEntryModal })(Entry)
