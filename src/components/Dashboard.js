import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CalendarHeatmap from 'react-calendar-heatmap'
import { chain } from 'lodash'
import './Dashboard.css'
import { PropTypes } from 'prop-types'
import { loadEntries, openEntryModal } from '../actions'
import UserNavbar from './UserNavbar'
import EntryModal from './entry/EntryModal'
import Entry from './entry/Entry'
import { Button, Grid, Divider, Message, Loader } from 'semantic-ui-react'

class Dashboard extends Component {
  componentWillMount() {
    this.props.loadEntries()
  }

  getLoader() {
    return <Loader size='medium' active inline='centered'>Loading</Loader>
  }

  getEmptyEntriesMessage() {
    return <Message compact>You don't have any entries yet!</Message>
  }

  getEntries() {
    const entries = this.props.entries.map((e) => {
      return (<Entry key={e.id} id={e.id} rating={e.rating} date={e.date} notes={e.notes} />)
    })

    if (entries.length === 0) {
      this.getEmptyEntriesMessage()
    } else {
      return (
        <Grid divided='vertically' style={{margin: 10}}>
          {entries}
        </Grid>
      )
    }
  }

  render() {
    const calendarValues = chain(this.props.entries)
    .map(e => {
      return {
        date: e.date,
        count: e.rating
      }
    })
    .filter(e => { return e.count !== undefined })
    .value()

    const composeEntryButton = (
      <Button
        icon='plus'
        content='Compose Entry'
        onClick={() => this.props.openEntryModal()}
        />
    )

    return (
      <div>
        <UserNavbar />
        <Grid centered verticalAlign='middle' columns={1}>
          <Grid.Column style={{'maxWidth': 950}}>
            <EntryModal trigger={composeEntryButton} />
            <Divider />
            <CalendarHeatmap
              numDays={366}
              values={calendarValues}
              classForValue={(value) => (value && value.count) ? `color-scale-${value.count}` : 'color-empty'}
              />
            <Divider />
            {this.props.loading ? this.getLoader() : this.getEntries()}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    entries: state.entry.entries,
    loading: state.entry.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadEntries, openEntryModal }, dispatch)
}

Dashboard.propTypes = {
  loadEntries: PropTypes.func.isRequired,
  openEntryModal: PropTypes.func.isRequired,
  entries: PropTypes.array,
  loading: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
