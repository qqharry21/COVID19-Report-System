/** @format */

import moment from 'moment';
import { dbConnect } from '../../../lib/config/dbConnect';
import Report from '../../../models/Report';

const latestHandler = async (req, res) => {
  await dbConnect();

  try {
    switch (req.method) {
      case 'GET':
        await getLatestReport();
        break;
      default:
        return res.status(405).json({ message: 'Only for GET requests' });
    }
  } catch (error) {
    console.log('🚨 ~ handler ~ error', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }

  async function getLatestReport() {
    try {
      const response = await Report.find().sort({ reportId: -1 }).limit(1);
      const latestId = response[0]?.reportId || 0;
      return res.status(200).send(latestId);
    } catch (error) {
      console.log('🚨 ~ getReport ~ error', error);
      return res.status(500).end();
    }
  }
};

export default latestHandler;
