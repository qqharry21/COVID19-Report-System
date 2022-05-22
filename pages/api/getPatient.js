/** @format */
import axios from 'axios';
import moment from 'moment';

/**
 * @param {*} req
 * @param {*} res
 * @description Get patient data by report id from google sheet
 * @returns
 */

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Only for GET requests');
  }

  try {
    const { reportId } = req.query;

    const response = await axios.get(
      `https://script.google.com/macros/s/AKfycby3VFeeV8Bt2NZBrSIhYFSQNgUiS9LwysXrXy9pMk9IereE4DxUCB90QPJ5o1RM6Yg3iQ/exec`,
      {
        params: {
          reportId: reportId,
        },
      }
    );
    const data = await response.data;
    const filterData = [];
    data.filter(item => {
      filterData.push({
        patientId: item[0],
        reportId: item[1],
        name: item[2],
        identity: item[3],
        sex: item[4],
        birth: moment(item[5]).format('YYYY-MM-DD'),
        age: item[6],
        id: item[7],
        phone: item[8],
        symptom: item[9],
        remark: item[10],
      });
    });

    return res.status(200).json(filterData);
  } catch (error) {
    return res.status(500).send({ message: error.message ?? 'Something went wrong' });
  }
};

export default handler;
