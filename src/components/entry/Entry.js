import React, { Component } from 'react'
import { Grid, Rating, Dropdown, Statistic } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import { openEntryModal, deleteEntry } from '../../actions'
import { connect } from 'react-redux'

class Entry extends Component {
  static propTypes = {
    rating: PropTypes.number,
    notes: PropTypes.string,
    date: PropTypes.string.isRequired,
    openEntryModal: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    deleteEntry: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.onEditClick = this.onEditClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  onEditClick () {
    this.props.openEntryModal({
      rating: this.props.rating,
      notes: this.props.notes,
      date: this.props.date,
      id: this.props.id
    })
  }

  onDeleteClick () {
    this.props.deleteEntry(this.props.id)
  }

  render () {
    return (
      <Grid.Row>
        <Grid.Column width={2} textAlign='center' style={{minWidth: 100, margin: '0 auto'}}>
          <Statistic size='small'>
            <Statistic.Label>{moment(this.props.date).format('MMM')}</Statistic.Label>
            <Statistic.Value>{moment(this.props.date).format('DD')}</Statistic.Value>
          </Statistic>
          <div>
            {this.props.rating ? <Rating style={{maxWidth: '100%', marginBottom: 20}} disabled size='tiny' maxRating={5} rating={this.props.rating} /> : null}
          </div>
        </Grid.Column>
        <Grid.Column textAlign='left' computer={10} tablet={10} mobile={16}>
          {this.props.notes}
        </Grid.Column>
        <Grid.Column width={1} verticalAlign='bottom' floated='right' style={{marginBottom: 0}}>
          <Dropdown icon='setting' className={'top right'}>
            <Dropdown.Menu style={{right: 0, left: 'auto'}}>
              <Dropdown.Item onClick={this.onEditClick} icon='edit' content='Edit' />
              <Dropdown.Item onClick={this.onDeleteClick} icon='delete' content='Delete' />
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default connect(null, { openEntryModal, deleteEntry })(Entry)
