import React from "react";
import { simpleAction } from '../../actions/aqi.actions';
import { connect } from 'react-redux';

class AQIList extends React.Component  {
  render() {
    return(
      <div>App works</div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

const mapStateToProps = state => ({
  ...state
 })

export default connect(mapStateToProps, mapDispatchToProps)(AQIList);