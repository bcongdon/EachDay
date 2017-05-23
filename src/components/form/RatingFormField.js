import React from 'react'
import { Rating } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'

function RatingFormField(props) {
  function handleChange(e, { rating, maxRating }) {
    props.input.onChange(rating)
  }
  return (
    <Rating rating={props.input.value} onRate={handleChange} maxRating={5} size='large' />
  )
}

RatingFormField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  defaultValue: PropTypes.number
}

export default RatingFormField
