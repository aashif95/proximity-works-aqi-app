import React from "react";
import { connect } from 'react-redux';

class AQIList extends React.Component  {
  render() {
    return(
      <div>App works</div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
 })

export default connect(mapStateToProps)(AQIList);