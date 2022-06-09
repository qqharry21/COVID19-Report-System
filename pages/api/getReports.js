/** @format */
import { google } from 'googleapis';

import { auth } from '../../lib/google';
import { getOptionValue } from '../../utils/CommonUtils';
import { statusOptions } from '../../utils/data';

/**
 * @param {*} req
 * @param {*} res
 * @description Get All reports from google sheet for reportPage
 * @returns
 */

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Only for GET requests');
  }

  try {
    // const latest_response = await fetch(`${server}/api/getLatestId`);

    // const latest_data = await latest_response.json();

    // 取得最新前20筆的google sheet範圍
    // const { startIndex, endIndex } = latest_data;

    // const sheet_response = await sheets.spreadsheets.values.get({
    //   spreadsheetId: process.env.GOOGLE_SHEET_ID,
    //   range: `A${startIndex}:L${endIndex}`,
    //   valueRenderOption: 'FORMATTED_VALUE',
    // });

    const sheets = google.sheets({ version: 'v4', auth });
    const sheet_response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `A2:M`,
      valueRenderOption: 'FORMATTED_VALUE',
    });

    const data = sheet_response?.data?.values;

    const reportData = [];
    data.forEach(item => {
      reportData.push({
        index: parseInt(item[0]) + 1,
        id: item[0],
        status: getOptionValue(statusOptions, item[1]),
        date: item[2],
        time: item[3],
        emergency: item[4],
        emergency_detail: item[5],
        patients: item[6],
        method: item[7],
        category: item[8],
        car: item[9],
        member: item[10],
        remark: item[11],
        total: item[12],
      });
    });

    reportData.sort((a, b) => {
      if (parseInt(a.id) < parseInt(b.id)) return 1;
      if (parseInt(a.id) > parseInt(b.id)) return -1;
      return 0;
    });

    return res.status(200).json(reportData);
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
};

export default handler;
