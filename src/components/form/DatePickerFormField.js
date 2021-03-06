import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class DatePickerFormField extends Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string
    })
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)

    // Default input to today
    if (this.props.input.value === '') {
      this.handleChange(moment())
    }
  }

  handleChange (date) {
    this.props.input.onChange(date.format('YYYY-MM-DD'))
  }

  render () {
    const { input, meta: {touched, error} } = this.props
    return (
      <div>
        <DatePicker
          selected={moment.utc(input.value)}
          dateFormat='YYYY-MM-DD'
          todayButton={'Today'}
          onChange={this.handleChange}
        />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
}

export default DatePickerFormField
