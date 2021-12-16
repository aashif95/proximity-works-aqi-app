import { UPDATE_AQI_DATA } from "./types";

export const updateAqiData = (data) => dispatch => {
  dispatch({
   type: UPDATE_AQI_DATA,
   payload: data
  })
 }