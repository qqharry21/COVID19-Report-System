/** @format */
import { google } from 'googleapis';
import { auth } from '../../lib/google';

/**
 *
 * @param {*} req
 * @param {*} res
 * @description Get the latest id from google sheet
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
      range: 'A2:A',
      valueRenderOption: 'UNFORMATTED_VALUE',
    });

    const maxId = sheet_response.data?.values?.flat().length + 1 || 1;

    const sheet1_response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: '患者資料!A2:A',
      valueRenderOption: 'UNFORMATTED_VALUE',
    });

    const patientMaxId = sheet1_response.data?.values?.flat().length + 1 || 1;

    return res.status(200).json({ max_report_id: maxId, max_patient_id: patientMaxId });
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
};

export default handler;
