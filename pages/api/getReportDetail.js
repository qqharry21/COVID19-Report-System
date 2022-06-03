/** @format */

import { getOptionValue } from '../../utils/CommonUtils';

import { statusOptions } from '../../utils/data';
import axios from '../../lib/axios';
import moment from 'moment';

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

    const response = await axios.get(
      'https://script.google.com/macros/s/AKfycbzafDZ0xNYyOZ473BHwAnu6BC_UNZmTpQJ3WfryvB12hdb2aCIRFTjfbp9pczxXOAlbdw/exec',
      {
        params: {
          reportId: reportId,
        },
      }
    );

    const data = await response.data;

    const patientData = data.patientData.flat();

    const patientList = [];
    patientData.forEach(patient => {
      patientList.push({
        patientId: patient[0],
        reportId: patient[1],
        name: patient[2],
        type: patient[3] === '患者' ? 1 : 2,
        sex: patient[4],
        birth: moment(patient[5]).format('YYYY-MM-DD'),
        age: patient[6],
        relation: patient[7],
        id: patient[8],
        phone: patient[9],
        symptom: patient[10],
        remark: patient[11],
      });
    });

    const reportData = data.reportData;
    const reportList = [];
    reportData.forEach(report => {
      reportList.push({
        reportId: report[0],
        status: getOptionValue(statusOptions, report[1]),
        date: moment(report[2]).format('YYYY-MM-DD'),
        time: report[3],
        emergency: report[4],
        emergency_detail: report[5],
        patients: patientList,
        method: report[7],
        category: report[8],
        car: report[9],
        member: report[10],
        remark: report[11],
        total: report[12],
        followUp: report[13],
        address: report[14],
        caption: report[15],
        hospital: report[16],
        time1: report[17],
        time2: report[18],
        time3: report[19],
        time4: report[20],
        time5: report[21],
        time6: report[22],
      });
    });

    return res.status(200).json(reportList);
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
};

export default handler;
