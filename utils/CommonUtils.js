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
  console.log('ð¨ ~ generateCopyText ~ newStatus', newStatus);

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
  let text = 'å ±åå±é·ï¼\n\n';
  if (emergency !== 'ä¸è¬') {
    text += `ã${emergency}åæ¡ã:${emergency_detail}\n\n`;
  }
  text += 'æ¶é²å±åçé²ç«æ¡ä»¶éå ±';
  if (emergency !== 'ä¸è¬') {
    newStatus === 'å·²çµæ¡' ? (text += 'ï¼çµå ±ï¼\n') : (text += 'ï¼åå ±ï¼\n');
  }
  text +=
    '\nåçæ¥æï¼' +
    date +
    ' ' +
    time +
    '\n' +
    'åçæ¹å¼ï¼' +
    method +
    '\n' +
    'åæ¡é¡å¥ï¼' +
    category +
    '\n' +
    'å°åï¼' +
    address +
    '\n' +
    '----------------\n' +
    patients
      ?.map(
        patient =>
          'æ£èå§åï¼' +
          patient?.name +
          '\n' +
          'åºçæ¥æï¼' +
          patient?.birth +
          '\n' +
          'æ§å¥ï¼' +
          patient?.sex +
          '\n' +
          'å¹´é½¡ï¼' +
          getAge(patient?.birth) +
          'æ­²' +
          '\n' +
          'åºç¾ççï¼' +
          patient?.symptom +
          '\n' +
          'èº«åè­å­èï¼' +
          patient?.id +
          '\n' +
          'é»è©±ï¼' +
          patient?.phone +
          '\n'
      )
      .join('\n') +
    `${
      accompany?.length > 0
        ? accompany
            ?.map(
              person =>
                '\néªåèå§åï¼' +
                person?.name +
                `(${person?.relation})` +
                '\n' +
                `${person.birth ? 'åºçæ¥æï¼' + person.birth + '\n' : ''}` +
                `${person.sex ? 'æ§å¥ï¼' + person.sex + '\n' : ''}` +
                `${person.birth ? 'å¹´é½¡ï¼' + getAge(person.birth) + 'æ­²\n' : ''}` +
                `${person.id ? 'èº«åè­å­èï¼' + person.id + '\n' : ''}` +
                `${person.phone ? 'é»è©±ï¼' + person.phone + '\n' : ''}`
            )
            .join('\n')
        : ''
    }`;
  text +=
    '----------------\n' +
    `${car && hospital ? `ç±${car}é${hospital}\n\n` : hospital ? 'é' + hospital + '\n\n' : ''}`;
  if (newStatus === 'å¾åå ±' || newStatus === 'å·²åå ±' || newStatus === 'å·²çµæ¡') {
    text +=
      `${time1 ? time1 + car + 'èè£åºå\n' : ''}` +
      `${time2 ? time2 + 'å°å ´\n' : ''}` +
      `${time3 ? time3 + 'é¢å ´éå¾\n' + hospital : ''}` +
      `${time4 ? time4 + (hospital.includes('é«é¢') ? 'å°é¢\n' : 'å°é\n') : ''}`;
  }
  if (newStatus === 'å·²çµæ¡') {
    text +=
      `${time5 ? time5 + car + 'é¢é' + hospital + '\n' : ''}` +
      `${time6 ? time6 + 'è¿éæ¸æ¶è»è¼\n' : ''}` +
      '\n';
    'åºå¤äººå¡ï¼' +
      member +
      '\n' +
      'ç£å°äººå¡ï¼' +
      caption +
      '\n' +
      'æ¬æ¡ç·¨èï¼' +
      reportId +
      '\n' +
      'ä»¥ä¸ç¶²åçºæ¬å±åå©è¡çå±çä¼¼æ­¦æ¼¢èºççæ¯è½é¢ä¹æ£èæ¸å®\nhttps://covid-19-report-system.vercel.app/reports';
  }

  return text;
}

function checkStatus(status, data) {
  let newStatus = status;
  if (data.emergency !== 'ä¸è¬') {
    newStatus = 'å¾åå ±';
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
      newStatus = 'å·²åå ±';
      if (data.time5 && data.time6) {
        newStatus = 'å·²çµæ¡';
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
    newStatus = 'å·²çµæ¡';
  }
  return newStatus;
}

function generateRemark(time2, time3, time4, time5, hospital) {
  return (
    time2 +
    'å°å ´, ' +
    time3 +
    'é¢å ´éå¾' +
    hospital +
    ', ' +
    time4 +
    (hospital.includes('é«é¢') ? 'å°é¢, ' : 'å°é, ') +
    time5 +
    'é¢é'
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
