/** @format */

import moment from 'moment';

export const initialData = {
  title: '新竹市消防局確診通報系統',
};

export const initialFilter = {
  method: [],
  emergency: [],
  category: [],
  startDate: '',
  endDate: '',
  age: { old: false, young: false },
  option: 'all',
};

export const initialAddValues = {
  reportId: 1,
  method: '',
  category: '',
  date: moment().format('YYYY-MM-DD'),
  time: moment().format('HH:mm'),
  address: '新竹市',
  emergency: '一般',
  emergency_detail: '',
  patients: [
    {
      name: '',
      birth: '1999-01-01',
      sex: '',
      symptom: '',
      id: '',
      phone: '',
      type: 1,
    },
  ],
  accompany: [],
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
  sex: '',
  symptom: '',
  id: '',
  phone: '',
  type: 1,
};

export const accompanyData = {
  name: '',
  relation: '',
  birth: '1999-01-01',
  sex: '',
  id: '',
  phone: '',
  type: 2,
};

export const table_column = [
  { name: 'status', title: '案件狀態' },
  { name: 'reportId', title: '案件編號' },
  { name: 'date', title: '受理日期' },
  { name: 'time', title: '受理時間' },
  { name: 'emergency', title: '案件等級' },
  { name: 'emergency_detail', title: '危急嚴重症狀' },
  { name: 'age', title: '患者資料' },
  { name: 'method', title: '受理方式' },
  { name: 'category', title: '案件類別' },
  { name: 'car', title: '出勤分隊救護車' },
  { name: 'member', title: '出勤人員' },
  { name: 'remark', title: '備註' },
  { name: 'total', title: '總人數' },
];

export const methodOptions = [
  {
    name: '1999轉報',
    value: 1,
  },
  {
    name: '衛生局通報',
    value: 3,
  },
  {
    name: '消防局自行受理',
    value: 2,
  },
];

export const statusOptions = [
  {
    name: '未結案',
    value: 1,
  },
  {
    name: '已結案',
    value: 2,
  },
  {
    name: '待初報',
    value: 3,
  },
  {
    name: '已初報',
    value: 4,
  },
];

export const categoryOptions = [
  { name: '快篩陽性 - 送醫採檢', value: '快篩陽性(A1)' },
  { name: '快篩陽性 - 採檢後返家', value: '快篩陽性(A2)' },
  { name: '居家檢疫 - 送醫', value: '居家檢疫(B1)' },
  { name: '居家檢疫 - 送集中檢疫所', value: '居家檢疫(B2)' },
  { name: '居家檢疫 - 送防疫旅館', value: '居家檢疫(B3)' },
  { name: '居家檢疫 - 送返家', value: '居家檢疫(B4)' },
  { name: '居家隔離 - 送醫', value: '居家隔離(C1)' },
  { name: '居家隔離 - 送採檢', value: '居家隔離(C2)' },
  { name: '居家隔離 - 接返家', value: '居家隔離(C3)' },
  { name: '確診個案 - 送醫', value: '確診個案(D1)' },
  { name: '確診個案 - 送集中檢疫所', value: '確診個案(D2)' },
  { name: '居家照護確診個案 - 送醫', value: '居家照護(E1)' },
  { name: '居家照護確診個案 - 接返家', value: '居家照護(E2)' },
];

export const sexOptions = [
  { name: '男', value: 1 },
  { name: '女', value: 2 },
  { name: '其他', value: 3 },
];

export const emergencyOptions = [
  { name: '一般案件', value: '一般' },
  { name: '嚴重個案', value: '嚴重' },
  { name: '危急個案', value: '危急' },
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

export const cans = [
  {
    title: '一級火警',
    href: '/fire_level1',
    icon: (
      <svg className='w-12 h-12 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'
        />
      </svg>
    ),
  },
  {
    title: '二級火警',
    href: '/fire_level2',
    icon: (
      <svg className='w-12 h-12 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'
        />
      </svg>
    ),
  },
];
