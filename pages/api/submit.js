/** @format */
import { google } from 'googleapis';
import { getAge, needPreReport } from '../../utils/CommonUtils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only for POST requests');
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

  const patientData = Object.keys(patients)
    .map(data => {
      return patients[data]?.sex + getAge(patients[data]?.birth) + '歲';
    })
    .join('\n');

  const accompanyData =
    accompany &&
    Object.keys(accompany)
      ?.map(data => {
        return accompany[data]?.sex + getAge(accompany[data]?.birth) + '歲(陪同)';
      })
      .join('\n');

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
    reportId,
    0,
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
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:U1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [data],
      },
    });

    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
}
