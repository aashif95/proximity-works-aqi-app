import React from "react";
import "./style.css";
import { timeAgo, numberFormater, calculateSevearity } from "../../helpers/storeLimitController";
const Card = (props) => {
  const { data } = props;
  const themeColor = calculateSevearity(numberFormater(data.aqi))
  return(
    <div className={`col-12 row m-0 card_body m-y-2 p-2 ${themeColor}`}>
      <div className={'col-12'}>
        <span className="city_name_text">{data.city}</span>
      </div>
      <div className="col-12 row m-0 p-0">
        <div className={'col-6'}>
          <span className="aqi_index_text">{numberFormater(data.aqi)}</span>
        </div>
        <div className={'col-6 text-right'}>
          <span className="relative_time_text">Updated</span><br/>
          <span className="relative_time_text">{timeAgo(new Date(data.updatedAt))}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;