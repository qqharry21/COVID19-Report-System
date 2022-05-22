/** @format */

import { parse, isDate } from 'date-fns';
import moment from 'moment';

function getOptionValue(object, target) {
  return object[Object.keys(object).find(key => object[key].name === target)]?.value;
}

function getOptionName(object, target) {
  return object[Object.keys(object).find(key => object[key].value === target)]?.name;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
}

function checkProperties(obj) {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] != '') return false;
  }
  return true;
}

function compareObject(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

function getAge(date) {
  var diff = moment(date).diff(moment(), 'milliseconds');
  var duration = moment.duration(diff);
  return duration.years().toString().replace('-', '');
}

function needPreReport(array) {
  return (
    array.find(data => {
      let age = getAge(data.birth);
      if (age <= 11 || age >= 65) return true;
    }) !== undefined
  );
}

function isEmergency(age) {
  return age >= 65 || age <= 11;
}

function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

function getStatusColor(status) {
  switch (status) {
    case 1:
      return 'bg-[#fce8b2] text-orange-700';
    case 2:
      return 'bg-[#b7e1cd] text-green-700';
    case 3:
      return 'bg-[#e5b8ae] text-red-700';
    case 4:
      return 'bg-[#d9d2e9] text-purple-700';
  }
}

export {
  sleep,
  getOptionValue,
  getOptionName,
  checkProperties,
  compareObject,
  parseDateString,
  needPreReport,
  isEmergency,
  getAge,
  onKeyDown,
  getStatusColor,
};
