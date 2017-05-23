import React from 'react'
import { Rating } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'

function RatingFormField(props) {
  function handleChange(e, { rating, maxRating }) {
    props.input.onChange(rating)
  }
  return (
    <Rating onRate={handleChange} maxRating={5} />
  )
}

RatingFormField.propTypes = {
  input: PropTypes.object.isRequired
}

export default RatingFormField
