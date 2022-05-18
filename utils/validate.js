/** @format */
import { getIn } from 'formik';
import * as yup from 'yup';
import { setLocale } from 'yup';
setLocale({
  mixed: { required: '必填' },
  number: {
    min: ({ min }) => `至少要輸入 ${min}位`,
    max: ({ max }) => `至多要輸入 ${max}位`,
  },
});

const dateRegExp =
  /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/;

const timeRegExp = /^(2[0-3]|[01]?[0-9]{2,}):([0-5]?[0-9]{2,})$/;

export const initialSchema = yup.object().shape({
  reportId: yup.string().required('受理編號 不得為空'),
  method: yup.string().required('受理方式 不得為空'),
  category: yup.string().required('個案類別 不得為空'),
  date: yup.string().matches(dateRegExp, '日期格式錯誤').required('受理日期 不得為空'),
  time: yup.string().matches(timeRegExp, '時間格式錯誤').required('受理時間 不得為空'),
  address: yup.string().required('地址 不得為空'),
  status: yup.string(),
  emergency: yup.boolean(),
  patients: yup
    .array()
    .of(
      yup.object().shape({
        emergency: yup.boolean(),
        name: yup.string().required('患者姓名 不得為空'),
        age: yup.string().required('年齡 不得為空'),
        sex: yup.string().required('性別 不得為空'),
        birth: yup.string().matches(dateRegExp, '日期格式錯誤').required('出生日期 不得為空'),
        symptom: yup.string().required('症狀 不得為空'),
        id: yup.string().required('身分證 不得為空'),
        phone: yup.string(),
      })
    )
    .min(1, '至少要填寫一筆患者資料')
    .max(4, '最多只能填寫四筆患者資料')
    .required('至少要填寫一筆患者資料'),
  accompany: yup.array().of(
    yup.object().shape({
      name: yup.string().required('陪同者姓名 不得為空'),
      age: yup.string(),
      relation: yup.string().required('關係 不得為空'),
      sex: yup.string(),
      birth: yup.string().matches(dateRegExp, '日期格式錯誤'),
      id: yup.string(),
      phone: yup.string(),
    })
  ),
  car: yup.string(),
  hospital: yup.string().required('送往醫院 不得為空'),
  detail: yup.string(),
  member: yup.string(),
  captain: yup.string(),
  time1: yup.string().min(4, '時間格式錯誤').max(4, '時間格式錯誤'),
  time2: yup.string().min(4, '時間格式錯誤').max(4, '時間格式錯誤'),
  time3: yup.string().min(4, '時間格式錯誤').max(4, '時間格式錯誤'),
  time4: yup.string().min(4, '時間格式錯誤').max(4, '時間格式錯誤'),
  time5: yup.string().min(4, '時間格式錯誤').max(4, '時間格式錯誤'),
  time6: yup.string().min(4, '時間格式錯誤').max(4, '時間格式錯誤'),
});

export const getErrors = (formik, field) => {
  const error = getIn(formik.errors, field.name);
  const touched = getIn(formik.touched, field.name);
  //情境：有touched的欄位跟error才跳錯訊
  // return touched && error;
  return (touched && error) || error;
};

export const getErrorMessage = (formik, field) => {
  return getIn(formik.errors, field.name);
};

// id: yup.string().test('id_reg', '格式錯誤', function (value) {
//         idValidate(value);
//       })

// const idValidate = value => {
//   const residenceRegex = /^([A-Z])(A|B|C|D|8|9)(\d{8})$/;
//   const passportRegex = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/;
//   const nativeRegex = /^[A-Za-z]{1}[1-2]{1}[0-9]{8}$/; // Change this regex based on requirement
//   let isValidResidence = residenceRegex.test(value);
//   // let isValidPassport = passportRegex.test(value);
//   let isValidId = nativeRegex.test(value);
//   if (!isValidResidence && !isValidId) {
//     return false;
//   }
//   return true;
// };
