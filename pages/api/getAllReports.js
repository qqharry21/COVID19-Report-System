/** @format */
import { google } from 'googleapis';
import { server } from '../../lib/config';
import { auth } from '../../lib/google';
import { getOptionValue } from '../../utils/CommonUtils';
import { statusOptions } from '../../utils/data';

/**
 * @param {*} req
 * @param {*} res
 * @description Get All reports from google sheet
 * @returns
 */

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Only for GET requests');
  }

  try {
    const response = await fetch(`${server}/api/getLatestId`);
    const { max_report_id } = await response.json();

    const sheets = google.sheets({ version: 'v4', auth });
    const sheet_response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A2:L',
      valueRenderOption: 'FORMATTED_VALUE',
    });

    const filterData = sheet_response?.data?.values.slice(
      max_report_id < 11 ? 0 : max_report_id - 11,
      max_report_id - 1
    );

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
