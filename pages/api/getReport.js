/** @format */

import { google } from 'googleapis';
import { server } from '../../lib/config';
import { getOptionValue } from '../../utils/CommonUtils';
import { auth } from '../../lib/google';
import { statusOptions } from '../../utils/data';

/**
 * @param {*} req
 * @param {*} res
 * @description Get report by report Id from google sheet
 * @returns
 */

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Only for GET requests');
  }

  try {
    const { reportId } = req.query;
    const sheets = google.sheets({ version: 'v4', auth });

    const index = parseInt(reportId) + 1; // +1 because the first row is the header
    const sheet_response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `A${index}:V${index}`,
      valueRenderOption: 'FORMATTED_VALUE',
    });
    const patientResponse = await fetch(`${server}/api/getPatient?reportId=${reportId}`);

    const patientData = await patientResponse.json();

    const data = [];

    sheet_response?.data?.values.forEach(item => {
      data.push({
        reportId: item[0],
        status: { name: item[1], value: getOptionValue(statusOptions, item[1]) },
        date: item[2],
        time: item[3],
        emergency: { name: item[4], value: item[4] === '是' },
        patient: patientData,
        method: item[6],
        category: item[7],
        car: item[8],
        member: item[9],
        remark: item[10],
        total: item[11],
        address: item[13],
        caption: item[14],
        hospital: item[15],
        time1: item[16],
        time2: item[17],
        time3: item[18],
        time4: item[19],
        time5: item[20],
        time6: item[21],
      });
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
};

export default handler;
