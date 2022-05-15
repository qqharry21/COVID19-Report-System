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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const initialSchema = yup.object().shape({
  reportId: yup.string().required('受理編號 不得為空'),
  method: yup.string().required('受理方式 不得為空'),
  category: yup.string().required('個案類別 不得為空'),
  date: yup.string().required('受理日期 不得為空'),
  time: yup.string().required('受理時間 不得為空'),
  address: yup.string().required('地址 不得為空'),
  patients: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('患者姓名 不得為空'),
        age: yup.string().required('年齡 不得為空'),
        sex: yup.string().required('性別 不得為空'),
        birth: yup.string().required('生日 不得為空'),
        symptom: yup.string().required('症狀 不得為空'),
        id: yup.string().required('身分證 不得為空'),
        phone: yup.string().required('聯絡電話 不得為空'),
      })
    )
    .min(1, '至少要填寫一筆患者資料')
    .max(4, '最多只能填寫四筆患者資料')
    .required('至少要填寫一筆患者資料'),
  accompany: yup.array().of(
    yup.object().shape({
      name: yup.string().required('陪同者姓名 不得為空'),
      age: yup.string().required('年齡 不得為空'),
      sex: yup.string().required('性別 不得為空'),
      birth: yup.string().required('生日 不得為空'),
      id: yup.string().required('身分證 不得為空'),
      phone: yup.string().required('聯絡電話 不得為空'),
    })
  ),
  car: yup.string().required('出勤車號 不得為空'),
  hospital: yup.string().required('送往醫院 不得為空'),
  detail: yup.string().required('送醫流程 不得為空'),
  member: yup.string().required('出勤人員 不得為空'),
  captain: yup.string().required('督導人員 不得為空'),
  // interest: yup.array().of(yup.string()).required().min(1, '展示興趣 不得為空'),
  // phone: yup
  //   .string()
  //   .matches(phoneRegExp, '請輸入相符格式的電話')
  //   .min(10, '電話 長度需至少大於10')
  //   .required('電話 不得為空'),
});

export const getErrors = (formik, field) => {
  const error = getIn(formik.errors, field.name);
  const touched = getIn(formik.touched, field.name);
  return touched && error;
};

export const getErrorMessage = (formik, field) => {
  return getIn(formik.errors, field.name);
};

// export const projectSchema = yup.object().shape({
//   project: yup
//     .array()
//     .of(
//       yup.object().shape({
//         name: yup.string().required('Project name is required'),
//         link: yup.string().url('Invalid url'),
//         description: yup.string().required('Description is required'),
//       })
//     )
//     .min(1, 'At least one project is required'),
// });

// export const experienceSchema = yup.object().shape({
//   experience: yup.array().of(
//     yup.object().shape({
//       company: yup.string().required('Company name is required'),
//       role: yup.string().required('Role is required'),
//       startDate: yup.string().required('Start date is required'),
//       endDate: yup.string().required('End date is required'),
//       description: yup.string().required('Description is required'),
//     })
//   ),
// });

// export const skillSchema = yup.object().shape({
//   skill: yup
//     .array()
//     .of(
//       yup.object().shape({
//         name: yup.string().required('Skill name is required'),
//       })
//     )
//     .min(1, 'At least one skill is required'),
// });
