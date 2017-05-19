import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as events from '../../events.json'
import CalendarHeatmap from 'react-calendar-heatmap'
import { chain } from 'lodash'
import './Dashboard.css'
import { loadEntries } from '../actions'

class Dashboard extends Component {
  componentWillMount() {
    this.props.loadEntries()
  }

  render() {
    const values = chain(events)
    .map(e => {
      return {
        date: e.date,
        count: e.rating,
        title: e.notes
      }
    })
    .filter(e => { return e.count !== undefined })
    .value()

    return (
      <div>
      <CalendarHeatmap
        endDate={new Date('12-31-2016')}
        numDays={366}
        values={values}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty'
          }
          return `color-scale-${value.count}`
        }} />
      {JSON.stringify(this.props.entries)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    entries: state.auth.entries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadEntries }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
