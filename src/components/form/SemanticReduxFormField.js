// Credit to https://stackoverflow.com/a/42422255

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

class SemanticReduxFormField extends Component {
  static propTypes = {
    as: PropTypes.any,
    input: PropTypes.any,
    label: PropTypes.any,
    meta: PropTypes.any
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e, { value }) {
    return this.props.input.onChange(value)
  }

  render () {
    const { input, label, meta, ...props } = this.props
    const { touched, error } = meta

    return (
      <div>
        <this.props.as {...input} value={input.value} {...props} onChange={this.handleChange} error={Boolean(touched && error)} />
        {touched && (error && <Message error content={error} />)}
      </div>
    )
  }
}

export default SemanticReduxFormField
