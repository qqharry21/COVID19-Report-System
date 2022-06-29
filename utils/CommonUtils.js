/** @format */

import { parse, isDate } from 'date-fns';
import moment from 'moment';
import { statusOptions } from '../lib/Form.config';

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
    : parse(originalValue, 'yyyy/MM/dd', new Date());

  return parsedDate;
}

function getAge(date) {
  var diff = moment(date).diff(moment(), 'milliseconds');
  var duration = moment.duration(diff);
  return parseInt(duration.years().toString().replace('-', ''));
}

function checkAge(age) {
  return age >= 65 || age <= 11;
}

function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

function generateCopyText(status, data) {
  const newStatus = checkStatus(status, data);
  console.log('🚨 ~ generateCopyText ~ newStatus', newStatus);

  const {
    reportId,
    method,
    category,
    date,
    time,
    address,
    patients,
    accompany,
    emergency_detail,
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
  let text = '報告局長：\n\n';
  if (emergency !== '一般') {
    text += `【${emergency}個案】:${emergency_detail}\n\n`;
  }
  text += '消防局受理防疫案件通報';
  if (emergency !== '一般') {
    newStatus === '已結案' ? (text += '（結報）\n') : (text += '（初報）\n');
  }
  text +=
    '\n受理日期：' +
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
    }`;
  text +=
    '----------------\n' +
    `${car && hospital ? `由${car}送${hospital}\n\n` : hospital ? '送' + hospital + '\n\n' : ''}`;
  if (newStatus === '待初報' || newStatus === '已初報' || newStatus === '已結案') {
    text +=
      `${time1 ? time1 + car + '著裝出動\n' : ''}` +
      `${time2 ? time2 + '到場\n' : ''}` +
      `${time3 ? time3 + '離場送往\n' + hospital : ''}` +
      `${time4 ? time4 + (hospital.includes('醫院') ? '到院\n' : '到達\n') : ''}`;
  }
  if (newStatus === '已結案') {
    text +=
      `${time5 ? time5 + car + '離開' + hospital + '\n' : ''}` +
      `${time6 ? time6 + '返隊清消車輛\n' : ''}` +
      '\n';
    '出勤人員：' +
      member +
      '\n' +
      '督導人員：' +
      caption +
      '\n' +
      '本案編號：' +
      reportId +
      '\n' +
      '以下網址為本局協助衛生局疑似武漢肺炎病毒轉院之患者清單\nhttps://covid-19-report-system.vercel.app/reports';
  }

  return text;
}

function checkStatus(status, data) {
  let newStatus = status;
  if (data.emergency !== '一般') {
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

function generateRemark(time2, time3, time4, time5, hospital) {
  return (
    time2 +
    '到場, ' +
    time3 +
    '離場送往' +
    hospital +
    ', ' +
    time4 +
    (hospital.includes('醫院') ? '到院, ' : '到達, ') +
    time5 +
    '離開'
  );
}

export {
  sleep,
  getOptionValue,
  getOptionName,
  parseDateString,
  checkAge,
  getAge,
  onKeyDown,
  generateCopyText,
  checkStatus,
  generateRemark,
};
