import React from "react";
import "./style.css";

const Card = (props) => {
  const { data } = props;
  return(
    <div className={'col-12 row m-0'}>
      <div className={'col-12'}>
        {data.city}
      </div>
      <div className={'col-12'}>
        {data.aqi}
      </div>
      <div className={'col-12'}>
        {JSON.stringify(data.updatedAt)}
      </div>
    </div>
  )
}

export default Card;