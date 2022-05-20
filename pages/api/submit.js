/** @format */
import { google } from 'googleapis';
import { getAge, needPreReport } from '../../utils/CommonUtils';
import { auth } from '../../lib/google';
import { server } from '../../lib/config';
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
    member,
    caption,
    time1,
    time2,
    time3,
    time4,
    time5,
    time6,
  } = req.body;

  const response = await fetch(`${server}/api/getLatestId`);
  const { max_report_id, max_patient_id } = await response.json();
  const id = max_report_id !== reportId ? max_report_id : reportId;
  const patientData = Object.keys(patients)
    .map(data => {
      return patients[data]?.sex + getAge(patients[data]?.birth) + '歲';
    })
    .join('\n');

  const accompanyData = accompany
    ? Object.keys(accompany)
        ?.map(data => {
          return accompany[data]?.sex + getAge(accompany[data]?.birth) + '歲(陪同)';
        })
        .join('\n')
    : '';

  const remark =
    (time2 ? time2 : '') +
    '到場, ' +
    (time3 ? time3 : '') +
    '離場送往' +
    hospital +
    ', ' +
    (time4 ? time4 : '') +
    (hospital.includes('醫院') ? '到院, ' : '到達, ') +
    (time5 ? time5 : '') +
    '離開';

  const data = [
    id,
    '未結案',
    date,
    time,
    needPreReport(patients) || emergency ? '是' : '否',
    accompanyData === '' ? patientData : patientData + '\n' + accompanyData,
    method,
    category,
    car,
    member,
    remark,
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
      range: 'A1:U1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [data],
      },
    });

    patients.forEach(async (patient, index) => {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `患者資料!A${index + 1}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              max_patient_id,
              id,
              patient?.name,
              1,
              patient?.sex,
              patient?.birth,
              getAge(patient?.birth) + '歲',
              patient?.id,
              patient?.phone,
              patient?.symptom,
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
