import React from "react";
import { connect } from 'react-redux';
import Card  from "../../components/Card";
import { cloneDeep } from 'lodash';
import { cityManager } from "../../helpers/storeLimitController";
class AQIList extends React.Component  {
  render() {
    const { aqiData } = cloneDeep(this.props)
    return(
      <div className={"w-100"}>
        <div className="container">
          <div className="w-100 row m-0">
            {cityManager(aqiData).map((data, index) => <div className="col-lg-3 col-md-4 col-sm-12 mt-3"><Card key={index} data={data}/></div>)}
          </div>
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