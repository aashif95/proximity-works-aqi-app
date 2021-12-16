export const UPDATE_AQI_DATA = 'UPDATE_AQI_DATA';

let INIT_STATE = {
  aqiData: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
   case UPDATE_AQI_DATA:
    return {
     result: action.payload
    }
   default:
    return state
  }
 }
 