import moment from "moment";
import { dataLengthLimit } from "../app.config";
import { orderBy, uniqBy } from "lodash";

const colorCodes = ['#80a66a', '#10f2d9', '#141513', '#52906e', '#9f26bf', '#a87b5d', '#5c1733', '#950cf7', '#8293e0', '#5c67ce', '#a19e4c']
export default function storeManager(incomingData, oldData) {
  incomingData.map(data => data['updatedAt'] = new Date());
  oldData.unshift(...incomingData);
  if (oldData.length > dataLengthLimit) {
    oldData.length = dataLengthLimit;
  }
  return oldData;
}


export function cityManager (data)  {
  const map = uniqBy(data, 'city');
  return orderBy(map,'city', 'asc')
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
      return {style: 'bg_very_good', status: 'Very Good'}
    case data > 50 && data <= 100:
      return {style: 'bg_good', status: 'Good'}
    case data > 100 && data <= 200:
      return {style: 'bg_moderate', status: 'Moderate'}
    case data > 200 && data <= 300:
      return {style: 'bg_poor', status: 'Poor'}
    case data > 300 && data <= 400:
      return {style: 'bg_very_poor', status: 'Very Poor'}
    case data > 400 && data <= 500:
      return {style: 'bg_severe', status: 'Severe'}
    default:
      return {style: "bg_very_good", status: 'Very Good'};
  }
}

export function getRelativeTime(date) {
  return timeDifference(new Date(), date);
}

function timeDifference(current, previous) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
       return Math.round(elapsed/1000) + ' seconds ago';   
  }

  else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' minutes ago';   
  }

  else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + ' hours ago';   
  }

  else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
  }

  else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
  }

  else {
      return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
  }
}

export function filterCities(allCities, cityName) {
  let filteredCities = [];
  for (let city of allCities) {
    if (city.city === cityName) {
      filteredCities.push([moment(new Date(city.updatedAt)).format('HH:mm:ss'), +(numberFormater(city.aqi))])
    }
  }
  return filteredCities.reverse();
}

export function comparisonChartDataFormater (allCities) {
  return cityManager(allCities).map((data, i) => [data.city, data.aqi, colorCodes[i], null])
} 