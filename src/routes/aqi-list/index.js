import React from "react";
import { connect } from 'react-redux';
import Card  from "../../components/Card";
import AqiComparisonChart  from "../../components/AqiComparisonChart";
import { cloneDeep } from 'lodash';
import { cityManager, comparisonChartDataFormater } from "../../helpers/storeLimitController";
import { Link } from "react-router-dom";
import NoDataFound from "../../components/NoDataFound";
class AQIList extends React.Component  {
  render() {
    const { aqiData } = cloneDeep(this.props)
    return(
      <div className={"w-100 mt-3"}>
        <div className="container">
          <div className="w-100">
            <div class="alert alert-info" role="alert">
              The Air Quality Index (AQI) is used for reporting daily air quality. It tells you how clean or polluted your air is, and what associated health effects might be a concern for you. The AQI focuses on health effects you may experience within a few hours or days after breathing polluted air.
            </div>
          </div>
          <div className="w-100 row m-0">
            <div className="col-lg-7 col-md-6 col-sm-12 row m-0">
              {cityManager(aqiData).map((data, index) => <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mb-4"><Link to={`/city?city=${data.city}`}><Card key={index} data={data}/></Link></div>)}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <div className="chart_conatiner">
                {aqiData.length > 0 ? <AqiComparisonChart data={comparisonChartDataFormater(aqiData)}/> : <NoDataFound />}
              </div>
            </div>
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