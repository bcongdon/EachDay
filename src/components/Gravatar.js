import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import { PropTypes } from 'prop-types'
import md5 from 'js-md5'

class Gravatar extends Component {
  getUrl () {
    const hash = md5(this.props.email)
    return `https://www.gravatar.com/avatar/${hash}?s=${this.props.size}&r=pg`
  }

  render () {
    return (
      <Image avatar={this.props.avatar} src={this.getUrl()} />
    )
  }
}

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
  size: PropTypes.number,
  avatar: PropTypes.bool
}

Gravatar.defaultProps = {
  size: 80,
  avatar: true
}

export default Gravatar
