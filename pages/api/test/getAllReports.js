/** @format */
import { google } from 'googleapis';
import moment from 'moment';
import { auth } from '../../../lib/config/google';

/**
 * @param {*} req
 * @param {*} res
 * @description Get total length by date from google sheet
 * @returns
 */

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Only for GET requests');
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const sheet_response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A2:L',
      valueRenderOption: 'FORMATTED_VALUE',
    });
    const data = sheet_response?.data?.values;

    // const todayTotal = data.filter(item => item[2] === moment().format('YYYY-MM-DD')).length;

    // const yesterdayTotal = data.filter(
    //   item => item[2] === moment().subtract(1, 'days').format('YYYY-MM-DD')
    // ).length;

    // const weekTotal = data.filter(item =>
    //   moment(item[2]).isBetween(moment().subtract(6, 'days'), moment())
    // ).length;

    // const monthTotal = data.filter(item => item[2].includes(moment().format('YYYY-MM'))).length;

    // const yearTotal = data.filter(item => item[2].includes(moment().format('YYYY'))).length;

    // return res.status(200).json({
    //   currentYear: moment().format('YYYY'),
    //   currentMonth: moment().format('MM'),
    //   currentDay: moment().format('DD'),
    //   today: todayTotal,
    //   yesterday: yesterdayTotal,
    //   week: weekTotal,
    //   month: monthTotal,
    //   year: yearTotal,
    // });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
};

export default handler;
