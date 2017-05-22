import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CalendarHeatmap from 'react-calendar-heatmap'
import { chain } from 'lodash'
import './Dashboard.css'
import { PropTypes } from 'prop-types'
import { loadEntries } from '../actions'
import UserNavbar from './UserNavbar'

class Dashboard extends Component {
  componentWillMount() {
    this.props.loadEntries()
  }

  render() {
    const values = chain(this.props.entries)
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
        <UserNavbar />
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

Dashboard.propTypes = {
  loadEntries: PropTypes.func.isRequired,
  entries: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
