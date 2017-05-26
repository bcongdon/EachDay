import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CalendarHeatmap from 'react-calendar-heatmap'
import { chain } from 'lodash'
import './DashboardPage.css'
import { PropTypes } from 'prop-types'
import { loadEntries, openEntryModal } from '../actions'
import UserNavbar from '../components/UserNavbar'
import EntryModal from '../components/entry/EntryModal'
import Entry from '../components/entry/Entry'
import { Button, Grid, Divider, Message, Loader, Dimmer } from 'semantic-ui-react'
import ErrorMessage from '../components/ErrorMessage'

class DashboardPage extends Component {
  componentWillMount () {
    this.props.loadEntries()
  }

  getLoader () {
    return <Loader size='medium' active inline='centered'>Loading</Loader>
  }

  getEmptyEntriesMessage () {
    return (
      <Message compact>
        You don't have any entries yet! Why don't you <a href='#' onClick={() => this.props.openEntryModal()}>write one</a>?
      </Message>
    )
  }

  getEntries () {
    const entries = this.props.entries.map((e) => {
      return (<Entry key={e.id} id={e.id} rating={e.rating} date={e.date} notes={e.notes} />)
    })

    if (entries.length === 0) {
      return this.getEmptyEntriesMessage()
    } else {
      return (
        <Grid divided='vertically' style={{margin: 10}}>
          {entries}
        </Grid>
      )
    }
  }

  showError () {
    return (
      <ErrorMessage compact message={this.props.error} />
    )
  }

  getCalendarLinks () {

  }

  render () {
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
        <Grid centered verticalAlign='middle'>
          <Grid.Column style={{'maxWidth': 950}}>
            <EntryModal trigger={composeEntryButton} />
            <Divider />
            <Dimmer.Dimmable dimmed={this.props.loading}>
              <Dimmer active={this.props.loading} inverted>
                <Loader>Loading</Loader>
              </Dimmer>
              <CalendarHeatmap
                numDays={366}
                values={calendarValues}
                classForValue={(value) => (value && value.count) ? `color-scale-${value.count}` : 'color-empty'}
                />
            </Dimmer.Dimmable>
            <Divider />
            {this.props.error ? this.showError() : (this.props.loading ? this.getLoader() : this.getEntries())}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    entries: state.entry.entries,
    loading: state.entry.loading,
    error: state.entry.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ loadEntries, openEntryModal }, dispatch)
}

DashboardPage.propTypes = {
  loadEntries: PropTypes.func.isRequired,
  openEntryModal: PropTypes.func.isRequired,
  entries: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
