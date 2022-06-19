/** @format */
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import axios from '../lib/axios';
import { Layout, FormLayout } from '../components/layout';
import { Form, Formik } from 'formik';
import { AddForm } from '../components/form';
import { initialAddValues } from '../utils/data';
import { initialSchema } from '../utils/validate';
import { onKeyDown, sleep, generateCopyText } from '../utils/CommonUtils';

export default function AddReport({ latestId }) {
  const [reportId, setReportId] = useState(() => {
    if (latestId) {
      return latestId + 1;
    }
    return 1;
  });
  const [copyText, setCopyText] = useState('');
  const router = useRouter();
  const textareaRef = useRef();

  async function handleSubmit(values, actions) {
    const loadingToast = toast.loading('新增中...');
    // 提交表單
    try {
      const res = await axios.post('/reports', {
        data: values,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 201) {
        sleep(1000);
        toast.success(res.data, { id: loadingToast });
        router.push('/reports');
      }
    } catch (error) {
      console.log('🚨 ~ handleSubmit ~ error', error);
      toast.error('發生錯誤，稍後再試', { id: loadingToast });
    }

    actions.setSubmitting(false);
  }

  async function handleCopy(formik) {
    const currentText = textareaRef.current.value;
    const text = generateCopyText(formik.values);

    if (currentText !== text && currentText !== '') {
      toast.custom(
        t => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}>
            <div className='flex justify-center w-full p-4 border-b border-gray-200'>
              <div className='flex items-center'>
                <p className='text-2xl'>❓</p>
                <div className='flex-1 ml-3'>
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
                  setCopyText(text);
                  navigator.clipboard.writeText(text);
                  toast.success('已複製至剪貼簿', { id: t.id, duration: 1000 });
                }}
                className='flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-l-lg btn btn--outline outline-l text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
                是
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  setCopyText(currentText);
                  navigator.clipboard.writeText(currentText);
                  toast.success('已複製到剪貼簿', { id: t.id, duration: 1000 });
                }}
                className='flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-r-lg btn btn--outline outline-r text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
                否
              </button>
            </div>
          </div>
        ),
        { duration: 10000 }
      );
    } else {
      setCopyText(text);
      navigator.clipboard.writeText(text);
      toast.success('已複製到剪貼簿', { duration: 1000 });
    }
  }

  return (
    <Layout title='新增案例'>
      <FormLayout>
        <Formik
          initialValues={{
            ...initialAddValues,
            reportId: reportId,
          }}
          onSubmit={handleSubmit}
          validationSchema={initialSchema}>
          {formik => {
            return (
              <Form
                autoComplete='off'
                className='flex flex-col justify-between h-full'
                noValidate
                onKeyDown={onKeyDown}>
                <AddForm
                  formik={formik}
                  copyText={copyText}
                  setCopyText={setCopyText}
                  reference={textareaRef}
                />
                <div
                  className={`mt-10 flex space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 flex-col sm:flex-row ${
                    1 ? 'justify-center' : 'justify-end'
                  }`}>
                  <button
                    type='button'
                    className='inline-flex btn sm:w-auto btn--outline outline-l group'
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
                      className='w-5 h-5 ml-2 transition-all duration-300 ease-in-out group-hover:animate-bounce'
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
                    className='inline-flex items-center btn sm:w-auto btn--outline outline-m text-main border-main before:bg-main group'
                    onClick={() => {
                      formik.resetForm();
                      toast.success('已清除表單內容');
                    }}>
                    <p className='sm:text-base'>重設</p>
                    <svg
                      className='w-5 h-5 ml-2 transition-all duration-300 ease-in-out group-hover:rotate-180'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <path stroke='none' d='M0 0h24v24H0z' />
                      <path d='M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5' />
                    </svg>
                  </button>
                  <button
                    type='submit'
                    className={`inline-flex btn sm:w-auto btn--outline outline-r items-center group ${
                      !(formik.dirty && formik.isValid) || formik.isSubmitting
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                    disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                    <p className='sm:text-base'>送出</p>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 ml-2 transition-all duration-300 ease-in-out group-hover:translate-x-2'
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
      </FormLayout>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const latestId = await axios.get('/reports/latest').then(res => res.data);
  return {
    props: {
      latestId,
    },
  };
};
