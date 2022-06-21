/** @format */

import { id } from 'date-fns/locale';
import moment from 'moment';
import { dbConnect } from '../../../lib/config/dbConnect';
import Report from '../../../models/Report';

const searchHandler = async (req, res) => {
  await dbConnect();

  try {
    switch (req.method) {
      case 'POST':
        const { data } = req.body;
        await getFilterReport(data);
        break;
      case 'GET':
        const { query } = req.query;
        await getSearchData(query);
        break;
      default:
        return res.status(405).json({ message: 'Only for GET, POST requests' });
    }
  } catch (error) {
    console.log('🚨 ~ handler ~ error', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }

  async function getFilterReport(data) {
    const options = [];

    if (data?.method?.length > 0) options.push({ method: { $in: data.method } });
    if (data?.category?.length > 0) options.push({ category: { $in: data.category } });
    if (data?.emergency?.length > 0) options.push({ emergency: { $in: data.emergency } });
    if (data?.age?.old) options.push({ patients: { $elemMatch: { age: { $gte: 65 } } } });
    if (data?.age?.young) options.push({ patients: { $elemMatch: { age: { $lte: 11 } } } });
    if (data?.option === 'range')
      options.push({
        date: {
          $gte: moment(data.startDate).format('YYYY-MM-DD'),
          $lte: moment(data.endDate).format('YYYY-MM-DD'),
        },
      });

    try {
      let reports = [];
      if (options.length > 0) {
        reports = await Report.find({
          $or: options,
        }).exec();
      } else {
        reports = await Report.find().exec();
      }

      if (data?.option === 'today') {
        const startDate = moment().subtract(1, 'days').format('YYYYMMDD') + '2300';
        const endDate = moment().format('YYYYMMDD') + '2300';
        const reportsToday = reports.filter(report => {
          let date = moment(report.date).format('YYYYMMDD') + report.time.replace(':', '');
          return startDate < date && date <= endDate;
        });
        return res.status(200).send(reportsToday);
      } else if (data?.option === 'range') {
        const endDate = moment(data.startDate).format('YYYYMMDD') + '2300';
        const startDate = moment(data.endDate).subtract(1, 'days').format('YYYYMMDD') + '2300';
        const reportsToday = reports.filter(report => {
          let date = moment(report.date).format('YYYYMMDD') + report.time.replace(':', '');
          return startDate < date && date <= endDate;
        });
        return res.status(200).send(reportsToday);
      } else if (data?.option === 'yesterday') {
        const startDate = moment().subtract(2, 'days').format('YYYYMMDD') + '2300';
        const endDate = moment().subtract(1, 'days').format('YYYYMMDD') + '2300';
        const reportsYesterday = reports.filter(report => {
          let date = moment(report.date).format('YYYYMMDD') + report.time.replace(':', '');
          return startDate < date && date <= endDate;
        });
        return res.status(200).send(reportsYesterday);
      }

      return res.status(200).send(reports);
    } catch (error) {
      console.log('🚨 ~ getFilterReport ~ error', error);
      return res.status(500).end();
    }
  }

  async function getSearchData(params) {
    try {
      const reports = await Report.find({ reportId: parseInt(params) })
        .sort({ reportId: -1 })
        .exec();
      return res.status(200).send(reports);
    } catch (error) {
      console.log('🚨 ~ getSearchData ~ error', error);
      return res.status(500).end();
    }
  }
};

export default searchHandler;
