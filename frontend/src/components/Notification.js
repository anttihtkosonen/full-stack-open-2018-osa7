// @flow

import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      color: 'red',
      border: 'solid',
      padding: 20,
      borderWidth: 3
    }

    if (this.props.notification.length===0) {
      return null
    }

    return (
      <div style={style}>
        {this.props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)