/** @format */
import { google } from 'googleapis';
import { auth } from '../../../lib/google';
import { getOptionValue } from '../../../utils/CommonUtils';
import { emergencyOptions, statusOptions } from '../../../utils/data';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Only for GET requests');
  }

  try {
    const { reportId, date, emergency, category, method, status } = req.query;

    const sheets = google.sheets({ version: 'v4', auth });

    const sheet_response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A2:L',
      valueRenderOption: 'FORMATTED_VALUE',
    });

    const filterData = sheet_response?.data?.values.filter(item => {
      return (
        item[0] === reportId ||
        getOptionValue(statusOptions, item[1]) === status ||
        item[2] === date ||
        getOptionValue(emergencyOptions, item[4]) === emergency ||
        item[6] === method ||
        item[7] === category
      );
    });

    const data = [];
    filterData.forEach(item => {
      data.push({
        index: parseInt(item[0]) + 1,
        id: item[0],
        status: { name: item[1], value: getOptionValue(statusOptions, item[1]) },
        date: item[2],
        time: item[3],
        emergency: { name: item[4], value: item[4] === '是' },
        patient: item[5],
        method: item[6],
        category: item[7],
        car: item[8],
        member: item[9],
        remark: item[10],
        total: item[11],
      });
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
};

export default handler;
