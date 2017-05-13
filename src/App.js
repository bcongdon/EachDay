import React, { Component } from 'react'
import * as events from '../events.json'
import CalendarHeatmap from 'react-calendar-heatmap'
import { chain } from 'lodash'
import './App.css'

class App extends Component {
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
      <CalendarHeatmap
        endDate={new Date('12-31-2016')}
        numDays={366}
        values={values}
        classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}/>
    )
  }
}

export default App
