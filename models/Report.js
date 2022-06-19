/** @format */

import { Schema, model, models } from 'mongoose';
import { generateRemark } from '../utils/CommonUtils';

const ReportSchema = new Schema({
  reportId: { type: String, unique: true },
  status: { type: Number, default: 1, required: true },
  method: {
    type: String,
    enum: {
      values: ['1999轉報', '衛生局通報', '消防局自行受理'],
      message: '{VALUE} 格式錯誤',
    },
    required: [true, '受理方式 不得為空'],
  },
  category: {
    type: String,
    enum: {
      values: [
        '快篩陽性(A1)',
        '快篩陽性(A2)',
        '居家檢疫(B1)',
        '居家檢疫(B2)',
        '居家檢疫(B3)',
        '居家檢疫(B4)',
        '居家隔離(C1)',
        '居家隔離(C2)',
        '居家隔離(C3)',
        '確診個案(D1)',
        '確診個案(D2)',
        '居家照護(E1)',
        '居家照護(E2)',
      ],
      message: '{VALUE} 格式錯誤',
    },
    required: [true, '個案類別 不得為空'],
  },
  date: { type: String, required: [true, '受理日期 不得為空'] },
  time: { type: String, required: [true, '受理時間 不得為空'] },
  address: {
    type: String,
    required: [true, '受理地址 不得為空'],
  },
  emergency: {
    type: String,
    enum: ['一般', '嚴重', '危急'],
    required: [true, '案件狀態 不得為空'],
  },
  emergency_detail: {
    type: String,
    required: function () {
      return this.emergency !== '一般';
    },
  },
  patients: [
    {
      name: { type: String, required: [true, '患者姓名 不得為空'] },
      birth: { type: String, required: [true, '患者生日 不得為空'] },
      age: { type: Number },
      sex: {
        type: String,
        required: [true, '患者性別 不得為空'],
        default: '男',
      },
      symptom: { type: String, required: [true, '患者症狀 不得為空'] },
      id: { type: String },
      phone: { type: String },
      type: { type: Number, default: 1 },
    },
  ],
  accompany: [
    {
      name: { type: String, required: [true, '陪訪人員姓名 不得為空'] },
      age: { type: Number },
      relation: { type: String, required: [true, '關係 不得為空'], default: '陪同者' },
      sex: {
        type: String,
        required: [true, '患者性別 不得為空'],
        default: '男',
      },
      birth: { type: String },
      id: { type: String },
      phone: { type: String },
    },
  ],
  car: { type: String },
  hospital: { type: String },
  time1: { type: String },
  time2: { type: String },
  time3: { type: String },
  time4: { type: String },
  time5: { type: String },
  time6: { type: String },
  member: { type: String },
  caption: { type: String },
  remark: {
    type: String,
    default: function () {
      return generateRemark(this.time2, this.time3, this.time4, this.time5, this.hospital);
    },
  },
  total: { type: Number },
});

const Report = models.Report || model('Report', ReportSchema);
export default Report;
