/** @format */

import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { getAge, needPreReport, sleep } from '../../utils/CommonUtils';
import AddForm from '../form/AddForm';
import Success from '../form/Success';
import toast from 'react-hot-toast';
import { initialAddValues } from '../../utils/data';
import { initialSchema } from '../../utils/validate';
import { duration } from 'moment';
import { server } from '../../lib/config';

const FormLayout = ({ children }) => {
  const [copyText, setCopyTest] = useState('');
  const router = useRouter();
  const textareaRef = useRef();

  async function submitForm(values, actions) {
    console.log('values', values);

    try {
      const response = await fetch(`${server}/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    await sleep(1000);
    actions.setSubmitting(false);
    // actions.resetForm();
  }

  const handleFinish = () => {
    router.push('/');
  };

  function handleSubmit(values, actions) {
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
      patients,
      accompany,
      car,
      hospital,
      emergency,
      member,
      caption,
      time1,
      time2,
      time3,
      time4,
      time5,
      time6,
    } = formik.values;
    const currentText = textareaRef.current.value;
    const text =
      '報告局長：\n\n' +
      `消防局受理防疫案件通報${needPreReport(patients) || emergency ? '（初報）' : ''}\n` +
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
        ?.map(
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
      `${
        accompany?.length > 0
          ? accompany
              ?.map(
                person =>
                  '\n陪同者姓名：' +
                  person?.name +
                  `(${person?.relation})` +
                  '\n' +
                  `${person.birth ? '出生日期：' + person.birth + '\n' : ''}` +
                  `${person.sex ? '性別：' + person.sex + '\n' : ''}` +
                  `${person.birth ? '年齡：' + getAge(person.birth) + '歲\n' : ''}` +
                  `${person.id ? '身分證字號：' + person.id + '\n' : ''}` +
                  `${person.phone ? '電話：' + person.phone + '\n' : ''}`
              )
              .join('\n')
          : ''
      }` +
      '----------------\n' +
      `${
        car && hospital ? `由${car}送${hospital}\n\n` : hospital ? '送' + hospital + '\n\n' : ''
      }` +
      `${time1 ? time1 + car + '著裝出動\n' : ''}` +
      `${time2 ? time2 + '到場\n' : ''}` +
      `${time3 ? time3 + '離場送往\n' + hospital : ''}` +
      `${time4 ? time4 + (hospital.includes('醫院') ? '到院\n' : '到達\n') : ''}` +
      `${time5 ? time5 + car + '離開' + hospital + '\n' : ''}` +
      `${time6 ? time6 + '返隊清消車輛\n' : ''}` +
      '\n' +
      '出勤人員：' +
      member +
      '\n' +
      '督導人員：' +
      caption +
      '\n' +
      '本案編號：' +
      reportId +
      '\n' +
      '以下網址為本局協助衛生局疑似武漢肺炎病毒轉院之患者清單\nhttps://tinyurl.com/bdd8fnct	';

    if (currentText !== text && currentText !== '') {
      const confirm = toast.custom(
        t => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}>
            <div className='w-full p-4 flex justify-center border-b border-gray-200'>
              <div className='flex items-center'>
                <p className='text-2xl'>❓</p>
                <div className='ml-3 flex-1'>
                  <p className='text-base font-medium text-gray-900'>通報表資料有更動</p>
                  <p className='mt-1 text-sm text-gray-500'>
                    是否取代舊有的值(輸入匡內即為舊有值）
                  </p>
                </div>
              </div>
            </div>
            <div className='flex'>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  setCopyTest(text);
                  navigator.clipboard.writeText(text);
                  toast.success('已複製至剪貼簿', { id: confirm, duration: 1000 });
                }}
                className='btn btn--outline outline-l w-full border border-transparent rounded-none rounded-l-lg p-4 flex items-center justify-center text-sm font-medium text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
                是
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  setCopyTest(currentText);
                  navigator.clipboard.writeText(currentText);
                  toast.success('已複製到剪貼簿', { id: confirm, duration: 1000 });
                }}
                className='btn btn--outline outline-r w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
                否
              </button>
            </div>
          </div>
        ),
        { duration: 10000 }
      );
    } else {
      setCopyTest(text);
      navigator.clipboard.writeText(text);
      toast.success('已複製到剪貼簿', { id: confirm, duration: 1000 });
    }
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
                initialValues={initialAddValues}
                onSubmit={handleSubmit}
                validationSchema={initialSchema}>
                {formik => {
                  return (
                    <Form
                      autoComplete='off'
                      className='flex flex-col justify-between h-full'
                      noValidate>
                      <AddForm
                        formik={formik}
                        copyText={copyText}
                        setCopyTest={setCopyTest}
                        reference={textareaRef}
                      />
                      <div
                        className={`mt-10 flex space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 flex-col sm:flex-row ${
                          1 ? 'justify-center' : 'justify-end'
                        }`}>
                        <button
                          type='button'
                          className='inline-flex btn sm:w-auto btn--outline outline-l'
                          onClick={() => {
                            // handleCopy(formik);
                            if (!(formik.dirty && formik.isValid)) {
                              toast.error('請先填寫通報表', { icon: '‼️' });
                              setTimeout(() => {}, []);
                            } else {
                              formik.validateForm().then(res => {
                                if (Object.keys(res).length === 0) {
                                  handleCopy(formik);
                                } else {
                                  toast.error('請更正表單內容', { icon: '‼️' });
                                }
                              });
                            }
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
                          onClick={() => formik.resetForm()}>
                          <p className='sm:text-base'>重設</p>
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
                        </button>
                        <button
                          type='submit'
                          className={`inline-flex btn sm:w-auto btn--outline outline-r items-center ${
                            !(formik.dirty && formik.isValid) || formik.isSubmitting
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                          }`}
                          disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                          <p className='sm:text-base'>送出</p>
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
