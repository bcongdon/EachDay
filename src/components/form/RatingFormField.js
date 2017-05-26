import React from 'react'
import { Rating } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'

function RatingFormField (props) {
  function handleChange (e, { rating, maxRating }) {
    props.input.onChange(rating)
  }
  const { input } = props
  return (
    <Rating rating={input.value} clearable={props.clearable} onRate={handleChange} maxRating={5} size='large' />
  )
}

RatingFormField.propTypes = {
  input: PropTypes.object.isRequired,
  clearable: PropTypes.bool
}

export default RatingFormField
