/** @format */
import { dbConnect } from '../../../lib/config/dbConnect';
import Report from '../../../models/Report';
import { parse } from 'json2csv';

const generateExcel = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  await dbConnect();

  let reports = [];

  const data = req.body;
  if (data.length > 0) {
    reports = data;
  } else reports = await Report.find().exec();

  reports.forEach(function (item, index) {
    const patient1 =
      item.patients.map(patient => {
        return patient.sex + patient?.age + '歲';
      }) || [];
    const patient2 =
      item?.accompany.map(person => {
        return person.sex + person?.age + '歲(陪同)';
      }) || [];
    this[index].patients = patient1.concat(patient2).join('\n');
  }, reports);

  const fields = [
    { label: '案件編號', value: 'reportId', position: 'center' },
    { label: '受理日期', value: 'date' },
    { label: '受理時間', value: 'time', position: 'center' },
    { label: '患者資料', value: 'patients', position: 'center' },
    { label: '受理方式', value: 'method' },
    { label: '案件狀況', value: 'category' },
    { label: '出勤分隊救護車', value: 'car' },
    { label: '出勤人員', value: 'member' },
    { label: '備註', value: 'remark' },
    { label: '人數', value: 'total', position: 'center' },
  ];

  const options = { withBOM: true, fields };
  try {
    const csv = parse(reports, options);
    res.setHeader('Content-Type', 'application/csv');
    res.setHeader('Content-disposition', 'attachment; filename=Reports.csv');
    return res.status(200).send(csv);
  } catch (error) {
    console.log(error);
    return res.status(503).json({ message: '匯出失敗' });
  }
};

export default generateExcel;
