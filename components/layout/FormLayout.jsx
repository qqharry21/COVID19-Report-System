/** @format */

import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getAge, sleep } from '../../utils/CommonUtils';
import { initialSchema } from '../../utils/validate';
import AddForm from '../form/AddForm';
import Success from '../form/Success';
import moment from 'moment';
import toast from 'react-hot-toast';

const FormLayout = ({ children }) => {
  const router = useRouter();

  const [copyText, setCopyTest] = useState('');

  async function submitForm(values, actions) {
    console.log('_submitForm');
    console.table(values);

    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);

    await sleep(1000);
    actions.setSubmitting(false);
    //actions.resetForm();
  }

  const handleFinish = () => {
    router.push('/events');
  };

  function handleSubmit(values, actions) {
    console.log('_handleSubmit');
    submitForm(values, actions); //提交表單
  }

  async function handleCopy(formik) {
    const {
      reportId,
      method,
      category,
      date,
      time,
      address,
      preReport,
      patients,
      accompany,
      car,
      hospital,
      detail,
      member,
      caption,
    } = formik.values;
    const text =
      '報告局長：\n\n' +
      '消防局受理防疫案件通報\n' +
      '受理日期：' +
      date +
      ' ' +
      time +
      '\n' +
      '受理方式：' +
      method +
      '\n' +
      '個案類別：' +
      category +
      '\n' +
      '地址：' +
      address +
      '\n' +
      '----------------\n' +
      patients
        .map(
          patient =>
            '患者姓名：' +
            patient?.name +
            '\n' +
            '出生日期：' +
            patient?.birth +
            '\n' +
            '性別：' +
            patient?.sex +
            '\n' +
            '年齡：' +
            getAge(patient?.birth) +
            '歲' +
            '\n' +
            '出現症狀：' +
            patient?.symptom +
            '\n' +
            '身分證字號：' +
            patient?.id +
            '\n' +
            '電話：' +
            patient?.phone +
            '\n'
        )
        .join('\n') +
      `${accompany.length > 0 ? '\n' : ''}` +
      accompany
        .map(
          person =>
            '陪同者姓名：' +
            person?.name +
            `(${person?.relation})` +
            '\n' +
            `${person.birth ? '出生日期：' + person.birth + '\n' : ''}` +
            `${person.sex ? '性別：' + person.sex + '\n' : ''}` +
            `${person.birth ? '年齡：' + getAge(person.birth) + '歲\n' : ''}` +
            `${person.id ? '身分證字號：' + person.id + '\n' : ''}` +
            `${person.phone ? '電話：' + person.phone + '\n' : ''}`
        )
        .join('\n') +
      '----------------\n' +
      `${car && hospital ? `由${car}送${hospital}` : hospital ? '送' + hospital : ''}`;
    setCopyTest(text);
    navigator.clipboard.writeText(text);
    toast.success('已複製到剪貼簿');
  }

  return (
    <section className='w-full items-center justify-center'>
      <div className='px-4 py-10 sm:px-6 lg:px-8'>
        {/* Content */}
        <div className='flex flex-col space-y-4 items-center'>
          {/* Form */}
          {0 ? (
            <Success onFinish={handleFinish} type='報名表' />
          ) : (
            <div className='bg-white rounded-lg shadow-lg h-fit p-8 sm:p-12'>
              <div className='pb-4'>
                <div className='flex items-center justify-center pb-4 space-x-2'>
                  <h3 className='text-teal-500 font-semibold text-center'>
                    消防局受理防疫案件通報
                  </h3>
                </div>
                <hr className='border-gray-200 w-full xs:w-[50%] mx-auto' />
              </div>
              <Formik
                initialValues={{
                  reportId: '1500',
                  method: '',
                  category: '',
                  date: moment().format('YYYY-MM-DD'),
                  time: moment().format('HH:mm'),
                  address: '新竹市',
                  preReport: '',
                  patients: [
                    {
                      emergency: false,
                      name: '',
                      birth: '1999-01-01',
                      age: getAge('1999-01-01'),
                      sex: '',
                      symptom: '',
                      id: '',
                      phone: '',
                    },
                  ],
                  accompany: [
                    {
                      name: '',
                      relation: '',
                      birth: '1999-01-01',
                      age: getAge('1999-01-01'),
                      sex: '',
                      id: '',
                      phone: '',
                    },
                  ],
                  car: '',
                  hospital: '',
                  detail: '',
                  member: '',
                  caption: '',
                }}
                validationSchema={initialSchema} //這裡還要再改，須根據每個分頁來做表單驗證
                onSubmit={handleSubmit}>
                {formik => {
                  return (
                    <Form autoComplete='off' className='flex flex-col justify-between h-full'>
                      <AddForm formik={formik} copyText={copyText} setCopyTest={setCopyTest} />
                      <div
                        className={`mt-10 flex space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 flex-col sm:flex-row ${
                          1 ? 'justify-center' : 'justify-end'
                        }`}>
                        <button
                          type='button'
                          className='inline-flex btn sm:w-auto btn--outline outline-l'
                          onClick={() => {
                            handleCopy(formik);
                            // if (!(formik.dirty && formik.isValid)) {
                            // toast.error('請先填寫表單', { icon: '‼️' });
                            // } else {
                            //   formik.validateForm().then(res => {
                            //     if (Object.keys(res).length === 0) {
                            //       handleCopy(formik);
                            //     }else{
                            // toast.error('請更正表單內容', { icon: '‼️' });
                            // }
                            //   });
                            // }
                          }}>
                          <p className='sm:text-base'>複製</p>
                          <svg
                            className='h-5 w-5 ml-3'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
                            />
                          </svg>
                        </button>
                        <button
                          type='submit'
                          className='inline-flex btn sm:w-auto btn--outline outline-r items-center '
                          disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                          <p className='sm:text-base'>送出</p>
                          {formik.isSubmitting ? (
                            <div className='relative w-6 h-6'>
                              <Image
                                src='/loader.gif'
                                alt='loader'
                                layout='fill'
                                objectFit='contain'
                              />
                            </div>
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-5 h-5 ml-3'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M14 5l7 7m0 0l-7 7m7-7H3'
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FormLayout;
