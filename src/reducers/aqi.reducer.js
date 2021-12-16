export const LOAD_AQI_DATA = 'LOAD_AQI_DATA';

export default (state = {name: 'aashif'}, action) => {
  switch (action.type) {
   case LOAD_AQI_DATA:
    return {
     result: action.payload
    }
   default:
    return state
  }
 }
 