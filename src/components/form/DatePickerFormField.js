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
    }),
    defaultValue: PropTypes.instanceOf(moment)
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.props.input.onChange(date.format('YYYY-MM-DD'))
  }

  render () {
    const { input, meta: {touched, error}, defaultValue } = this.props
    const value = input.value === '' ? moment() : moment(input.value)
    return (
      <div>
        <DatePicker
          selected={value}
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
