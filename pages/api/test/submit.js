/** @format */
import { google } from 'googleapis';
import {
  getAge,
  checkStatus,
  getPatientAndAccompanyData,
  generateRemark,
} from '../../utils/CommonUtils';
import { auth } from '../../lib/config/google';
import axios from '../../lib/config/axios';

/**
 * @param {*} req
 * @param {*} res
 * @description Post the new report to google sheet
 * @returns
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only for POST requests' });
  }

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
    emergency_detail,
    member,
    caption,
    time1,
    time2,
    time3,
    time4,
    time5,
    time6,
  } = req.body;

  const latest_response = await axios(`/getLatestId`).then(res => res.data);

  const max_report_id = latest_response.max_report_id
    ? parseInt(latest_response.max_report_id) + 1
    : 1;
  const max_patient_id = latest_response.max_patient_id
    ? parseInt(latest_response.max_patient_id) + 1
    : 1;

  const currentId = max_report_id !== reportId ? max_report_id : reportId;
  const allPatients = patients.concat(accompany);

  const data = [
    currentId,
    checkStatus('未結案', req.body),
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
    '',
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

  try {
    const sheets = google.sheets({ version: 'v4', auth });

    const sheet1_response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:W1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [data],
      },
    });

    allPatients.forEach(async (person, index) => {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `患者資料!A1:L1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              max_patient_id + index,
              currentId,
              person?.name,
              person?.type === 1 ? '患者' : '陪同者',
              person?.sex || '',
              person?.birth || '',
              getAge(person?.birth) || '',
              person?.relation || '',
              person?.id || '',
              person?.phone || '',
              person?.symptom || '',
              '',
            ],
          ],
        },
      });
    });

    return res.status(200).json({ 總表: sheet1_response.data });
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
}
