import React from 'react';
import Loader from "../../assets/images/loader/loader.svg";
export default function NoDataFound () {
  return(
    <div className='w-100 text-center'>
      <img src={Loader}/>
    </div>
  )
}