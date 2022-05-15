/** @format */

export const initialData = {
  title: '新竹市消防局確診通報系統',
};

export const table_column = [
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

export const personal_protection = {
  title: '個人資料保護說明',
  description:
    '亞德諾股份有限公司將依據個人資料保護法使用登記報名資訊。活動報名前請詳閱個人資料保護聲明。',
  content: [
    {
      title: 1,
      text: '個人資料蒐集目的',
      children: [{ title: 1, text: '上述之相關業務或其他符合營業項目所定義之工作範圍。' }],
    },
    {
      title: 2,
      text: '個人資料蒐集類別',
      children: [
        {
          title: 1,
          text: '識別類（例如：中、英文姓名、聯絡電話號碼、地址、性別、電子郵遞地址）、特徵類（例如：出生年月日）、社會情況類（例如：職業、學經歷）等。',
        },
      ],
    },
    {
      title: 3,
      text: '個人資料利用之期間、地區、對象及方式',
      children: [
        { title: 1, text: '期間：利用期間為本單位或業務所必須之保存期間。' },
        {
          title: 2,
          text: '地區：您的個人資料將用於本單位提供服務之地區。',
        },
        {
          title: 3,
          text: '對象：本單位之共同行銷、交互運用客戶資料公司、合作推廣單位、業務往來機構、依法有調查權機關或金融監理機關。',
        },
        { title: 4, text: '方式：電子文件、紙本，或以自動化機器或其他非自動化之利用方式。' },
        { title: 5, text: '其他：您的個人資料將同意提供予ADI原廠進行記錄、追蹤及後續推廣。' },
      ],
    },
    {
      title: 4,
      text: '依據個資法第三條規定，您就本單位保有您的個人資料得行使下列權利',
      children: [
        {
          title: 1,
          text: '查詢、閱覽、複本、補充、更正、請求停止蒐集、請求停止處理、請求停止利用、請求刪除等權利。',
        },
      ],
    },
  ],
};

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
  { name: '快篩陽性-送醫採檢', value: 'A1' },
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

export const interestOptions = [
  { text: 'Ultralow power micro controller', title: '超低功號微控器' },
  { text: 'AI platform (MAX78000)', title: 'AI深度神經網路加速器' },
  { text: 'ADI watch', title: '穿戴式生命監測系統' },
  { text: 'Eagle eyes', title: '慧人數統計系統' },
  { text: 'Water analysis (pH/ DO) ', title: '水質物聯網系統' },
  { text: 'Wireless CbM platform', title: '無線振動監測系統' },
  { text: 'Smoke detection', title: '煙霧和火災探測平台' },
  { text: 'ToF platform', title: '深度感測開發平台' },
];
// const sex = [
//   {
//     label: '男生',
//     value: true,
//   },
//   {
//     label: '女生',
//     value: false,
//   },
// ];
