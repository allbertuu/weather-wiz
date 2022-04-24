import moment from 'moment';

let body = document.body;

let currentTime = moment().format('LT');

function getTimeFormatAM_PM() {
  let lastIndex = currentTime[currentTime.length - 1];
  let penultimateIndex = currentTime[currentTime.length - 2];
  return penultimateIndex + lastIndex;
}

function getHour() {
  let arrTime = currentTime.split(':');
  let extractedHour = arrTime[0];
  return extractedHour;
}

export function handleBodyStyles() {
  let hour = getHour();
  let timeFormat = getTimeFormatAM_PM();
  
  if(timeFormat === 'PM') {
    if(hour >= '6') {
      body.className = 'night';
    }
  }
  else {
    if(hour >= '6') {
      body.classList.remove('night');
    }
  }
}