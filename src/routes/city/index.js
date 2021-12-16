import React from "react";
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import AqiChart from "../../components/AqiChart";
import { filterCities } from "../../helpers/storeLimitController";

class City extends React.Component  {
  render() {
    const query = new URLSearchParams(window.location.search)
    const { aqiData } = cloneDeep(this.props)
    const data = filterCities(aqiData, query.get('city'))
    return(
      <div className={"w-100"}>
        <div className="container">
          <div className="w-100 row m-0">
            <AqiChart data={data} city={query.get('city')}/>
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

export default connect(mapStateToProps)(City);