// Credit to https://stackoverflow.com/a/42422255

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

class SemanticReduxFormField extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e, { value }) {
    return this.props.input.onChange(value)
  }

  render() {
    const { input, label, meta, defaultValue, ...props } = this.props
    const { touched, error } = meta
    const value = touched ? input.value : defaultValue

    return (
      <div>
        <this.props.as {...input} value={value} {...props} onChange={this.handleChange} error={Boolean(touched && error)} />
        {touched && (error && <Message error content={error} />)}
      </div>
    )
  }
}

SemanticReduxFormField.propTypes = {
  as: PropTypes.any,
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.any,
  defaultValue: PropTypes.any
}

export default SemanticReduxFormField
