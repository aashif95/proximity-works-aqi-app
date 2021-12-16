import React from "react";
import { connect } from 'react-redux';
import Card  from "../../components/Card";
class AQIList extends React.Component  {
  render() {
    const { aqiData } = this.props
    return(
      <div className={"w-100"}>
        <div className="container">
          {aqiData.map((data, index) => <Card key={index} data={data}/>)}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = ({aqiReducer}) => {
  const { aqiData } = aqiReducer
  return { aqiData }
 }

export default connect(mapStateToProps)(AQIList);