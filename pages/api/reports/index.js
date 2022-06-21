/** @format */

import moment from 'moment';
import axios from '../../../lib/config/axios';
import { dbConnect } from '../../../lib/config/dbConnect';
import Report from '../../../models/Report';
import { checkStatus, generateRemark, getAge, getOptionValue } from '../../../utils/CommonUtils';
import { statusOptions } from '../../../lib/data';

const reportHandler = async (req, res) => {
  await dbConnect();

  try {
    switch (req.method) {
      case 'GET':
        if (req.query?.reportId) await getReportById(req.query.reportId);
        else await getReport();
        break;
      case 'POST':
        await createReport(req.body.data);
        break;
      case 'PUT':
        await updateReport(req.query.id, req.body.data);
        break;
      case 'DELETE':
        await deleteReport(req.body.id);
        break;
      default:
        return res.status(405).json({ message: 'Only for GET, POST, PUT, DELETE requests' });
    }
  } catch (error) {
    console.log('🚨 ~ handler ~ error', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }

  // POST /api/reports
  async function createReport(data) {
    try {
      const report = new Report(data);
      const patients = data.patients.map(patient => {
        return {
          ...patient,
          age: getAge(patient.birth),
          birth: patient.birth,
        };
      });
      const accompanies =
        data.accompany.map(accompany => {
          return {
            ...accompany,
            age: getAge(accompany?.birth || '1999-01-01'),
            birth: accompany?.birth || '1999-01-01',
          };
        }) || [];
      const latestId = await axios.get('/reports/latest').then(res => res.data);
      if (latestId !== data.reportId) report.reportId = latestId + 1;

      report.patients = patients;
      report.accompany = accompanies;
      report.total = patients.length + accompanies.length;
      if (data.emergency !== '一般') report.status = 3;
      else report.status = 1;

      const response = await report.save();
      return res.status(201).send('新增成功！');
    } catch (error) {
      console.log('🚀 ~ createReport ~ Error', error.message);
      return res.status(500).end();
    }
  }
  // GET /api/reports
  async function getReport() {
    try {
      const response = await Report.find();
      return res.status(200).send(response);
    } catch (error) {
      console.log('🚨 ~ getReport ~ error', error);
      return res.status(500).end();
    }
  }
  // GET /api/reports/:reportId
  async function getReportById(reportId) {
    try {
      const response = await Report.findOne({ reportId });
      return res.status(200).send(response);
    } catch (error) {
      console.log('🚨 ~ getReport ~ error', error);
      return res.status(500).end();
    }
  }
  // PUT /api/reports
  async function updateReport(id, data) {
    try {
      const report = await Report.findById({ _id: id });
      if (!report) return res.status(204).end();
      const patients = data.patients.map(patient => {
        return {
          ...patient,
          age: getAge(patient.birth),
          birth: patient.birth,
        };
      });
      const accompanies =
        data.accompany.map(accompany => {
          return {
            ...accompany,
            age: getAge(accompany?.birth || '1999-01-01'),
            birth: accompany?.birth || '1999-01-01',
          };
        }) || [];

      await Report.findByIdAndUpdate(id, {
        $set: {
          method: data.method,
          category: data.category,
          date: data.date,
          time: data.time,
          address: data.address,
          emergency: data.emergency,
          emergency_detail: data.emergency_detail,
          car: data.car,
          hospital: data.hospital,
          time1: data.time1,
          time2: data.time2,
          time3: data.time3,
          time4: data.time4,
          time5: data.time5,
          time6: data.time6,
          member: data.member,
          caption: data.caption,
          remark: generateRemark(data.time2, data.time3, data.time4, data.time5, data.hospital),
          patients: patients,
          accompanies: accompanies,
          total: patients.length + accompanies.length,
          status: getOptionValue(statusOptions, checkStatus(data.status, data)),
        },
      });

      return res.status(201).send('更新成功！');
    } catch (error) {
      console.log('🚨 ~ updateReport ~ error', error);
      return res.status(500).end();
    }
  }

  async function deleteReport(id) {
    try {
      const report = await Report.findById({ _id: id });
      if (!report) return res.status(204).end();
      await Report.findByIdAndDelete(id);
      return res.status(201).send('刪除成功！');
    } catch (error) {
      console.log('🚨 ~ deleteReport ~ error', error);
      return res.status(500).end();
    }
  }
};
export default reportHandler;
