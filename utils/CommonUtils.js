/** @format */

import { parse, isDate } from 'date-fns';
import moment from 'moment';

function getObjectValue(object, target) {
  return Object.keys(object).find(key => object[key] === target);
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

export {
  sleep,
  getObjectValue,
  getOptionName,
  checkProperties,
  compareObject,
  parseDateString,
  getAge,
};
