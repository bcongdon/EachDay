import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CalendarHeatmap from 'react-calendar-heatmap'
import { chain } from 'lodash'
import './Dashboard.css'
import { PropTypes } from 'prop-types'
import { loadEntries } from '../actions'
import UserNavbar from './UserNavbar'
import EntryComposer from './entry/EntryComposer'
import Entry from './entry/Entry'
import { Button, Grid, Divider, Message } from 'semantic-ui-react'
import moment from 'moment'

class Dashboard extends Component {
  componentWillMount() {
    this.props.loadEntries()
  }

  getEntries() {
    const entries = this.props.entries.map((e) => {
      return (<Entry key={e.id} rating={e.rating} date={moment(e.date)} notes={e.notes} />)
    })

    if (entries.length === 0) {
      return <Message compact>You don't have any entries yet!</Message>
    } else {
      return entries
    }
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
        <Grid centered verticalAlign='middle' columns={1}>
          <Grid.Column style={{'maxWidth': 600}}>
            <EntryComposer trigger={<Button icon='plus' content='Compose Entry' />} />
            <Divider />
            <CalendarHeatmap
              numDays={366}
              values={values}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty'
                }
                return `color-scale-${value.count}`
              }} />
            <Divider />
            {this.getEntries()}
          </Grid.Column>
        </Grid>
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
