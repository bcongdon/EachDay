import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class DatePickerFormField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.bool
    })
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)

    // Default to today
    this.handleChange(moment())
  }

  handleChange (date) {
    this.props.input.onChange(moment(date).format('YYYY-MM-DD'))
  }

  render () {
    const { input, meta: {touched, error} } = this.props

    return (
      <div>
        <DatePicker
          {...input}
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
