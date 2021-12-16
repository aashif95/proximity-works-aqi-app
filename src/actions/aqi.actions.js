import { LOAD_AQI_DATA } from "./types";
export const simpleAction = () => dispatch => {
  dispatch({
   type: LOAD_AQI_DATA,
   payload: 'result_of_simple_action'
  })
 }