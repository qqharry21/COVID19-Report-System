/** @format */

import { parse, isDate } from 'date-fns';
import moment from 'moment';
import { statusOptions } from './data';

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

function checkPatientAge(array) {
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

function generateCopyText(data) {
  const {
    reportId,
    method,
    category,
    date,
    time,
    address,
    patients,
    accompany,
    car,
    hospital,
    emergency,
    member,
    caption,
    time1,
    time2,
    time3,
    time4,
    time5,
    time6,
  } = data;
  return (
    '報告局長：\n\n' +
    `消防局受理防疫案件通報${
      data?.status && getOptionValue(statusOptions, data?.status) === 4
        ? '（結報）'
        : emergency || checkPatientAge(patients)
        ? '（初報）'
        : ''
    }\n` +
    '受理日期：' +
    date +
    ' ' +
    time +
    '\n' +
    '受理方式：' +
    method +
    '\n' +
    '個案類別：' +
    category +
    '\n' +
    '地址：' +
    address +
    '\n' +
    '----------------\n' +
    patients
      ?.map(
        patient =>
          '患者姓名：' +
          patient?.name +
          '\n' +
          '出生日期：' +
          patient?.birth +
          '\n' +
          '性別：' +
          patient?.sex +
          '\n' +
          '年齡：' +
          getAge(patient?.birth) +
          '歲' +
          '\n' +
          '出現症狀：' +
          patient?.symptom +
          '\n' +
          '身分證字號：' +
          patient?.id +
          '\n' +
          '電話：' +
          patient?.phone +
          '\n'
      )
      .join('\n') +
    `${
      accompany?.length > 0
        ? accompany
            ?.map(
              person =>
                '\n陪同者姓名：' +
                person?.name +
                `(${person?.relation})` +
                '\n' +
                `${person.birth ? '出生日期：' + person.birth + '\n' : ''}` +
                `${person.sex ? '性別：' + person.sex + '\n' : ''}` +
                `${person.birth ? '年齡：' + getAge(person.birth) + '歲\n' : ''}` +
                `${person.id ? '身分證字號：' + person.id + '\n' : ''}` +
                `${person.phone ? '電話：' + person.phone + '\n' : ''}`
            )
            .join('\n')
        : ''
    }` +
    '----------------\n' +
    `${car && hospital ? `由${car}送${hospital}\n\n` : hospital ? '送' + hospital + '\n\n' : ''}` +
    `${time1 ? time1 + car + '著裝出動\n' : ''}` +
    `${time2 ? time2 + '到場\n' : ''}` +
    `${time3 ? time3 + '離場送往\n' + hospital : ''}` +
    `${time4 ? time4 + (hospital.includes('醫院') ? '到院\n' : '到達\n') : ''}` +
    `${time5 ? time5 + car + '離開' + hospital + '\n' : ''}` +
    `${time6 ? time6 + '返隊清消車輛\n' : ''}` +
    '\n' +
    '出勤人員：' +
    member +
    '\n' +
    '督導人員：' +
    caption +
    '\n' +
    '本案編號：' +
    reportId +
    '\n' +
    '以下網址為本局協助衛生局疑似武漢肺炎病毒轉院之患者清單\nhttps://tinyurl.com/bdd8fnct	'
  );
}

function checkStatus(status, data) {
  let newStatus = status;
  if (data.emergency) {
    newStatus = '待初報';
    if (
      data.car &&
      data.hospital &&
      data.member &&
      data.caption &&
      data.time1 &&
      data.time2 &&
      data.time3 &&
      data.time4
    ) {
      newStatus = '已初報';
      if (data.time5 && data.time6) {
        newStatus = '已結案';
      }
    }
  } else if (
    data.car &&
    data.hospital &&
    data.member &&
    data.caption &&
    data.time1 &&
    data.time2 &&
    data.time3 &&
    data.time4 &&
    data.time5 &&
    data.time6
  ) {
    newStatus = '已結案';
  }
  return newStatus;
}

function getPatientAndAccompanyData(mergeArray) {
  return Object.keys(mergeArray)
    .map(key => {
      if (mergeArray[key].type === 1) {
        return mergeArray[key]?.sex + getAge(mergeArray[key]?.birth) + '歲';
      } else {
        return mergeArray[key]?.sex + getAge(mergeArray[key]?.birth) + '歲（陪同）';
      }
    })
    .join('\n');
}

function generateRemark(time2, time3, time4, time5, hospital) {
  return (
    (time2 ? time2 : '') +
    '到場, ' +
    (time3 ? time3 : '') +
    '離場送往' +
    hospital +
    ', ' +
    (time4 ? time4 : '') +
    (hospital.includes('醫院') ? '到院, ' : '到達, ') +
    (time5 ? time5 : '') +
    '離開'
  );
}

function countTotal() {}

export {
  sleep,
  getOptionValue,
  getOptionName,
  checkProperties,
  compareObject,
  parseDateString,
  checkPatientAge,
  isEmergency,
  getAge,
  onKeyDown,
  getStatusColor,
  generateCopyText,
  checkStatus,
  getPatientAndAccompanyData,
  generateRemark,
};
