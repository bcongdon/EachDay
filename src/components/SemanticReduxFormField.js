// Credit to https://stackoverflow.com/a/42422255

import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

export default function SemanticReduxFormField ({ input, label, meta: { touched, error, warning }, as: As = Input, ...props }) {
  function handleChange (e, { value }) {
    return input.onChange(value)
  }
  return (
    <div>
      <As {...input} value={input.value} {...props} onChange={handleChange} error={Boolean(touched && error)} />
      {touched && (warning && <span>{warning}</span>)}
    </div>
  )
}

SemanticReduxFormField.propTypes = {
  as: PropTypes.any,
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.any
}
