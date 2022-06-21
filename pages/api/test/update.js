/** @format */
import { google } from 'googleapis';
import {
  checkStatus,
  generateRemark,
  getAge,
  getPatientAndAccompanyData,
} from '../../utils/CommonUtils';
import { auth } from '../../lib/config/google';
import { server } from '../../lib/config/config';
import axios from '../../lib/config/axios';

/**
 * @param {*} req
 * @param {*} res
 * @description Update the report to google sheet by report id
 * @returns
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only for POST requests' });
  }

  const {
    reportId,
    status,
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
    emergency_detail,
    member,
    caption,
    time1,
    time2,
    time3,
    time4,
    time5,
    time6,
    followUp,
    originPatients,
  } = req.body;

  const allPatients = patients.concat(accompany).sort((a, b) => a.type - b.type);

  const data = [
    reportId,
    checkStatus(status, req.body),
    date,
    time,
    emergency,
    emergency_detail,
    getPatientAndAccompanyData(allPatients),
    method,
    category,
    car,
    member,
    generateRemark(time2, time3, time4, time5, hospital),
    patients?.length + (accompany?.length || 0),
    followUp,
    address,
    caption,
    hospital,
    time1,
    time2,
    time3,
    time4,
    time5,
    time6,
  ];

  const originIdList = originPatients.map(person => {
    return person.patientId;
  });

  const updateList = allPatients.map(person => {
    return person.patientId;
  });

  const deleteList = originIdList.filter(id => !updateList.includes(id));

  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const index = parseInt(reportId) + 1;

    allPatients.forEach(async (person, index) => {
      // update patients
      if (person.patientId) {
        const index_response = await axios.get(
          `https://script.google.com/macros/s/AKfycbwuqTh7_8uOpXezQi1gM-8fQRjK4YP30M8rgN-pTYF4qqZYJ2kG5tbJzcrEwLsFnifwag/exec?id=${person.patientId}`
        );
        const { index } = await index_response.data;
        await sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          requestBody: {
            valueInputOption: 'USER_ENTERED',
            data: [
              {
                range: `患者資料!A${index}:L${index}`,
                values: [
                  [
                    person.patientId,
                    reportId,
                    person?.name,
                    person?.type === 1 ? '患者' : '陪同者',
                    person?.sex,
                    person?.birth,
                    getAge(person?.birth),
                    person?.relation ? person?.relation : '',
                    person?.id,
                    person?.phone,
                    person?.symptom ? person?.symptom : '',
                    person?.remark,
                  ],
                ],
              },
            ],
          },
        });
      } else {
        // insert patients
        const latest_response = await axios(`${server}/api/getLatestId`).then(res => res.data);
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: `患者資料!A1:L1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [
                latest_response.max_patient_id + 1,
                reportId,
                person?.name,
                person.type === 1 ? '患者' : '陪同者',
                person?.sex,
                person?.birth,
                getAge(person?.birth),
                person?.relation ? person?.relation : '',
                person?.id,
                person?.phone,
                person?.symptom ? person?.symptom : '',
                person?.remark,
              ],
            ],
          },
        });
      }
    });

    // update report
    const sheet1_response = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data: [
          {
            range: `A${index}:W${index}`,
            majorDimension: 'ROWS',
            values: [data],
          },
        ],
      },
    }).data;

    //delete
    for (let i = 0; i < deleteList.length; i++) {
      await axios
        .get(
          `https://script.google.com/macros/s/AKfycbxps8-F9VlgBkj7juSUHXmSTSO-epoozEFVwA8GQ85bRj0q8jjNnDvc4G-8DwXNvtx7Tg/exec?id=${deleteList[i]}`
        )
        .then(res => {
          if (res.status === 200) console.log('delete success');
        })
        .catch(err => {
          throw new Error(err);
        });
    }

    return res.status(200).json({ 總表: sheet1_response });
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
}
