import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CalendarHeatmap from 'react-calendar-heatmap'
import './Dashboard.css'
import { PropTypes } from 'prop-types'
import { loadEntries, openEntryModal } from '../actions'
import EntryModal from './entry/EntryModal'
import Entry from './entry/Entry'
import { Button, Grid, Divider, Message, Loader, Dimmer } from 'semantic-ui-react'
import ErrorMessage from './ErrorMessage'
import ReactTooltip from 'react-tooltip'
import MediaQuery from 'react-responsive'
import moment from 'moment'
import { scroller } from 'react-scroll'
import Mousetrap from 'mousetrap'

export class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.onEntryClick = this.onEntryClick.bind(this)
  }

  componentWillMount () {
    this.props.loadEntries()
    Mousetrap.bind('ctrl+n', this.props.openEntryModal)
  }

  componentWillUnount () {
    Mousetrap.unbind('ctrl+n', this.props.openEntryModal)
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

  onEntryClick (entry) {
    if (entry && entry.id) {
      scroller.scrollTo(`entry-${entry.id}`, {
        duration: 250,
        smooth: true
      })
    }
  }

  render () {
    const calendarValues = this.props.entries.map(e => {
      return {
        date: e.date,
        count: e.rating,
        id: e.id
      }
    })
    .filter(e => { return e.count !== undefined })

    const composeEntryButton = (
      <Button
        icon='plus'
        content='Compose Entry'
        onClick={() => this.props.openEntryModal()}
        />
    )

    return (
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
                endDate={Date.now()}
                values={calendarValues}
                classForValue={(value) => (value && value.count) ? `ui color-scale-${value.count}` : 'ui color-empty'}
                tooltipDataAttrs={this.customTootipTitle}
                onClick={this.onEntryClick}
                />
              <Divider />
            </MediaQuery>
          </Dimmer.Dimmable>
          {this.props.error ? this.showError() : (this.props.loading ? this.getLoader() : this.getEntries())}
        </Grid.Column>
      </Grid>
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

Dashboard.propTypes = {
  loadEntries: PropTypes.func.isRequired,
  openEntryModal: PropTypes.func.isRequired,
  entries: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
