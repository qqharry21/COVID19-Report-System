/** @format */

import moment from 'moment';
import { getAge } from './CommonUtils';

export const initialData = {
  title: '新竹市消防局確診通報系統',
};

export const initialAddValues = {
  reportId: '1500',
  method: '',
  category: '',
  date: moment().format('YYYY-MM-DD'),
  time: moment().format('HH:mm'),
  address: '新竹市',
  emergency: false,
  patients: [
    {
      name: '',
      birth: '1999-01-01',
      age: getAge('1999-01-01'),
      sex: '',
      symptom: '',
      id: '',
      phone: '',
    },
  ],
  car: '',
  hospital: '',
  time1: '',
  time2: '',
  time3: '',
  time4: '',
  time5: '',
  time6: '',
  member: '',
  caption: '',
};

export const patientData = {
  name: '',
  birth: '1999-01-01',
  age: getAge('1999-01-01'),
  sex: '',
  symptom: '',
  id: '',
  phone: '',
};

export const accompanyData = {
  name: '',
  relation: '',
  birth: '1999-01-01',
  age: getAge('1999-01-01'),
  sex: '',
  id: '',
  phone: '',
};

export const table_column = [
  { name: 'emergency', title: '危及個案' },
  { name: 'reportId', title: '受理編號' },
  { name: 'method', title: '受理方式' },
  { name: 'category', title: '個案類別' },
  { name: 'date', title: '受理日期' },
  { name: 'time', title: '受理時間' },
  { name: 'address', title: '地址' },
  { name: 'name', title: '患者姓名' },
  { name: 'age', title: '年齡' },
  { name: 'sex', title: '性別' },
  { name: 'symptom', title: '出現症狀' },
  { name: 'id', title: '身分證字號' },
  { name: 'phone', title: '聯絡電話' },
  { name: 'car', title: '車號' },
  { name: 'hospital', title: '送往醫院' },
  { name: 'detail', title: '到院過程' },
  { name: 'member', title: '隊員' },
  { name: 'captain', title: '小隊長' },
  { name: 'total', title: '總人數' },
];

export const methodOptions = [
  {
    name: '1999轉報',
    value: 1,
  },
  {
    name: '消防局自行受理',
    value: 2,
  },
  {
    name: '衛生局通報',
    value: 3,
  },
];

export const categoryOptions = [
  { name: '快篩陽性 - 送醫採檢', value: 'A1' },
  { name: '快篩陽性 - 採檢後返家', value: 'A2' },
  { name: '居家檢疫 - 送醫', value: 'B1' },
  { name: '居家檢疫 - 送集中檢疫所', value: 'B2' },
  { name: '居家檢疫 - 送防疫旅館', value: 'B3' },
  { name: '居家檢疫 - 送返家', value: 'B4' },
  { name: '居家隔離 - 送醫', value: 'C1' },
  { name: '居家隔離 - 送採檢', value: 'C2' },
  { name: '居家隔離 - 接返家', value: 'C3' },
  { name: '確診個案 - 送醫', value: 'D1' },
  { name: '確診個案 - 送集中檢疫所', value: 'D2' },
  { name: '居家照護確診個案 - 送醫', value: 'E1' },
  { name: '居家照護確診個案 - 接返家', value: 'E2' },
];

export const sexOptions = [
  { name: '男', value: 1 },
  { name: '女', value: 2 },
];

export const captionOptions = [
  {
    name: '分隊長吳育昇0910594945',
    value: '吳育昇',
  },
  {
    name: '分隊長游坤哲0910594823',
    value: '游坤哲',
  },
  {
    name: '小隊長王明星0937895874',
    value: '王明星',
  },
  {
    name: '小隊長顏丞均0921878981',
    value: '顏丞均',
  },
  {
    name: '小隊長劉炫志0931080637',
    value: '劉炫志',
  },
  {
    name: '小隊長黃士豪0921278719',
    value: '黃士豪',
  },
  {
    name: '小隊長陳怡霖0912375167',
    value: '吳育昇',
  },
  {
    name: '小隊長潘裕淵0912231123',
    value: '潘裕淵',
  },
];
