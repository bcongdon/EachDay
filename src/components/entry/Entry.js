import React, { Component } from 'react'
import { Item, Segment, Rating, Dropdown } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import { openEntryModal, deleteEntry } from '../../actions'
import { connect } from 'react-redux'

class Entry extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    notes: PropTypes.string,
    date: PropTypes.string.isRequired,
    openEntryModal: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    deleteEntry: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.onEditClick = this.onEditClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  onEditClick() {
    this.props.openEntryModal({
      rating: this.props.rating,
      notes: this.props.notes,
      date: this.props.date,
      id: this.props.id
    })
  }

  onDeleteClick() {
    this.props.deleteEntry(this.props.id)
  }

  render() {
    return (
      <Segment textAlign='left'>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{moment(this.props.date).format('YYYY-MM-DD')}</Item.Header>
              <Item.Meta><Rating disabled maxRating={5} rating={this.props.rating} /></Item.Meta>
              <Item.Description>
                {this.props.notes}
              </Item.Description>
              <Dropdown style={{float: 'right'}} icon='setting'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.onEditClick} icon='edit' content='Edit' />
                  <Dropdown.Item onClick={this.onDeleteClick} icon='delete' content='Delete' />
                </Dropdown.Menu>
              </Dropdown>
            </Item.Content>
          </Item>
        </Item.Group>

      </Segment>
    )
  }
}

export default connect(null, { openEntryModal, deleteEntry })(Entry)
