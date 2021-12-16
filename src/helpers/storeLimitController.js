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

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${ minutes }`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${ prefomattedDate } at ${ hours }:${ minutes }`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${ day }. ${ month } at ${ hours }:${ minutes }`;
  }

  // 10. January 2017. at 10:20
  return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
}


// --- Main function
export function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();


  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${ seconds } seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${ minutes } minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today'); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date); // 10. January 2017. at 10:20
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