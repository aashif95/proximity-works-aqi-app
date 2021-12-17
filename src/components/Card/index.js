import React from "react";
import "./style.css";
import { getRelativeTime,  numberFormater, calculateSevearity } from "../../helpers/storeLimitController";

const Card = (props) => {
  const { data } = props;
  const status = calculateSevearity(numberFormater(data.aqi))
  return(
    <div className={`col-12 row m-0 card_body m-y-2 p-2 ${status.style}`}>
      <div className={'col-12'}>
        <span className="city_name_text">{data.city}</span>
      </div>
      <div className="col-12 row m-0 p-0">
        <div className={'col-lg-6 col-md-12 col-sm-12'}>
          <span className="aqi_index_text">{numberFormater(data.aqi)}</span>
        </div>
        <div className={'col-lg-6 col-md-12 col-sm-12'}>
          <span className="status_label">Status:</span> <br /> <span className="status_text">{status.status}</span>
          <br /> 
          <span className="status_label">Updated At:</span> <br /> 
          <span> {data.noFormat ? data.updatedAt : getRelativeTime(data.updatedAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;