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
import { Button, Grid, Divider } from 'semantic-ui-react'
import moment from 'moment'

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
        <Grid centered verticalAlign='middle' columns={1}>
          <Grid.Column style={{'maxWidth': 600}}>
            <EntryComposer trigger={<Button>Compose Entry</Button>} />
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
            <Entry rating={3} date={moment()} notes={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur placerat nisi, ut semper dui porttitor sed. Etiam ut feugiat purus. Sed accumsan placerat turpis at finibus. Nunc pellentesque, tellus a rhoncus luctus, est lectus commodo eros, sed pulvinar arcu enim sit amet risus. Integer condimentum, dolor vitae gravida lacinia, nunc metus bibendum metus, at euismod lorem orci at nisi. Etiam nibh enim, dictum pellentesque facilisis sit amet, dapibus sed urna. Mauris et eros quis erat tempor ultricies vitae ac lectus. Integer vulputate sapien vel interdum tristique. Fusce vitae risus et nisl varius fermentum. Etiam aliquet nunc id fermentum lacinia. Vestibulum non purus magna. Aliquam maximus sit amet justo at efficitur. Morbi sit amet orci vel lorem faucibus fringilla.'} />
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
