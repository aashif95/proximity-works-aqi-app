import moment from "moment";
import { dataLengthLimit } from "../app.config";
import { orderBy } from "lodash";
export default function storeManager(incomingData, oldData) {
  incomingData.map(data => data['updatedAt'] = new Date());
  oldData.unshift(...incomingData);
  if (oldData.length > dataLengthLimit) {
    oldData.length = dataLengthLimit;
  }
  return oldData;
}


export function cityManager (data)  {
  const map = new Map(data.map(({city, updatedAt, aqi}) => [city, { city, updatedAt, aqi }])); 
  for (let {city, updatedAt} of data) map.get(city).updatedAt = updatedAt;
  let result = [...map.values()];
  result = orderBy(result,'city', 'asc')
  return result;
}

export function numberFormater (number) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(number)
}

export function calculateSevearity (data) {
  switch (true) {
    case data <= 50:
      return 'bg_very_good'
    case data > 50 && data <= 100:
      return 'bg_good'
    case data > 100 && data <= 200:
      return 'bg_moderate'
    case data > 200 && data <= 300:
      return 'bg_poor'
    case data > 300 && data <= 400:
      return 'bg_very_poor'
    case data > 400 && data <= 500:
      return 'bg_severe'
    default:
      return "bg_very_good";
  }
}

export function getRelativeTime(date) {
  return moment(new Date(date)).fromNow();
}

export function filterCities(allCities, cityName) {
  let filteredCities = [];
  for (let city of allCities) {
    if (city.city === cityName) {
      filteredCities.push([moment(new Date(city.updatedAt)).format('HH:mm:ss'), +(numberFormater(city.aqi))])
    }
  }
  return filteredCities;
}