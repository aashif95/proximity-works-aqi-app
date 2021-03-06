import React from "react";
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import AqiChart from "../../components/AqiChart";
import { filterCities } from "../../helpers/storeLimitController";
import Card  from "../../components/Card";
import Breadcrumb from "../../components/Breadcrumb";
import NoDataFound from "../../components/NoDataFound";
class City extends React.Component  {
  render() {
    const query = new URLSearchParams(window.location.search)
    const { aqiData } = cloneDeep(this.props)
    const data = filterCities(aqiData, query.get('city'))
    const currentData = data[data.length -1];
    return(
      <div className={"w-100 pt-3"}>
        <div className="container">
          <div className="w-100">
            <Breadcrumb current={query.get('city')} prevLink={'/'} prevTitle={'Cities'}/>
          </div>
          <div className="w-100 row m-0">
            <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
              {currentData?.length > 0 && <Card data={{aqi: currentData[1], city: query.get('city'), updatedAt: currentData[0], noFormat: true}}/>}
            </div>
            <div className="col-lg-7 col-md-6 col-sm-12 row m-0">
              <div className="chart_conatiner w-100 h-100">
                {data?.length > 0 ? <AqiChart data={data} city={query.get('city')}/> : <NoDataFound />}
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

export default connect(mapStateToProps)(City);