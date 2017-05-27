import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CalendarHeatmap from 'react-calendar-heatmap'
import './DashboardPage.css'
import { PropTypes } from 'prop-types'
import { loadEntries, openEntryModal } from '../actions'
import UserNavbar from '../components/UserNavbar'
import EntryModal from '../components/entry/EntryModal'
import Entry from '../components/entry/Entry'
import { Button, Grid, Divider, Message, Loader, Dimmer } from 'semantic-ui-react'
import ErrorMessage from '../components/ErrorMessage'
import ReactTooltip from 'react-tooltip'
import MediaQuery from 'react-responsive'
import moment from 'moment'

import _ from 'lodash/wrapperLodash'
import map from 'lodash/map'
import filter from 'lodash/filter'
import mixin from 'lodash/mixin'
import chain from 'lodash/chain'
mixin(_, {map: map, chain: chain, filter: filter})

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

  customTootipTitle (value) {
    if (!value.date) {
      return {'data-tip': 'No Entries'}
    }
    const date = moment(value.date).format('MMM DD')
    const stars = '⭐'.repeat(value.count)
    return {'data-tip': `${date}: ${stars}`}
  }

  render () {
    const calendarValues = _.chain(this.props.entries)
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
              <MediaQuery component='div' minWidth={720} style={{width: 700, margin: '0 auto'}}>
                <ReactTooltip
                  effect='solid'
                  offset={{right: 6}}
                  />
                <CalendarHeatmap
                  numDays={366}
                  values={calendarValues}
                  classForValue={(value) => (value && value.count) ? `ui color-scale-${value.count}` : 'ui color-empty'}
                  tooltipDataAttrs={this.customTootipTitle}
                  />
                <Divider />
              </MediaQuery>
            </Dimmer.Dimmable>
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
