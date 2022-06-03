/** @format */

import React, { useRef, useState } from 'react';
import { server } from '../../lib/config';
import { FormLayout, Layout } from '../../components/layout';
import { Form, Formik } from 'formik';
import { initialSchema } from '../../utils/validate';
import {
  checkPatientAge,
  generateCopyText,
  getOptionName,
  onKeyDown,
  sleep,
} from '../../utils/CommonUtils';
import toast from 'react-hot-toast';
import { EditForm } from '../../components/form';
import { useRouter } from 'next/router';
import { statusOptions } from '../../utils/data';
import axios from '../../lib/axios';
import useSWR from 'swr';
import { Error, Loading } from '../../components';

// const fetcher = async (url, id) => {

//   return axios.get(url, { params: { reportId: id } }).then(res => res.data);
// };

const ReportDetailPage = ({ detail }) => {
  const router = useRouter();
  // const { id } = router.query;

  // const { data, error } = useSWR(id ? [`${server}/api/getReportDetail`, id] : null, fetcher);

  const [copyText, setCopyText] = useState('');
  const textareaRef = useRef();

  const accompany = [];
  const patients = [];

  // if (error) return <Error />;
  // if (!data) return <Loading />;

  detail[0]?.patients?.forEach(item => {
    if (item.type === 1) {
      patients.push({
        patientId: item.patientId,
        reportId: item.reportId,
        name: item?.name,
        birth: item?.birth,
        sex: item?.sex,
        type: item.type,
        id: item?.id,
        phone: item?.phone,
        symptom: item?.symptom,
      });
    } else if (item.type === 2) {
      accompany.push({
        patientId: item.patientId,
        reportId: item.reportId,
        name: item?.name,
        relation: item?.relation,
        birth: item?.birth,
        sex: item?.sex,
        type: item.type,
        id: item?.id,
        phone: item?.phone,
        symptom: item?.symptom,
      });
    }
  });

  const initialValues = {
    ...detail[0],
    patients: [...patients],
    accompany: [...accompany],
    status: getOptionName(statusOptions, detail[0]?.status),
  };

  const handleSubmit = async (values, actions) => {
    const updateValues = {
      ...values,
      emergency: checkPatientAge(values.patients) || values.emergency,
      originPatients: patients.concat(accompany),
    };
    //提交表單
    toast.promise(
      axios.post(`${server}/api/update`, updateValues).then(async res => {
        console.log(res.status + ' ' + res.statusText);
      }),
      {
        loading: '更新中...',
        success: () => {
          router.push('/report');
          actions.setSubmitting(false);
          return '修改成功';
        },
        error: err => {
          console.log('err', err);
          actions.setSubmitting(false);
          return '修改失敗，請重整網頁後嘗試';
        },
      }
    );
  };

  async function handleCopy(formik) {
    const currentText = textareaRef.current.value;
    const text = generateCopyText(formik.values);

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
                  setCopyText(text);
                  navigator.clipboard.writeText(text);
                  toast.success('已複製至剪貼簿', { id: confirm, duration: 800 });
                }}
                className='btn btn--outline outline-l w-full border border-transparent rounded-none rounded-l-lg p-4 flex items-center justify-center text-sm font-medium text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
                是
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  setCopyText(currentText);
                  navigator.clipboard.writeText(currentText);
                  toast.success('已複製到剪貼簿', { id: confirm, duration: 800 });
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
      setCopyText(text);
      navigator.clipboard.writeText(text);
      toast.success('已複製到剪貼簿', { duration: 800 });
    }
  }
  return (
    <Layout title={`案件${detail[0].reportId}`}>
      <FormLayout>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={initialSchema}>
          {formik => {
            return (
              <Form
                autoComplete='off'
                className='flex flex-col justify-between h-full'
                noValidate
                onKeyDown={onKeyDown}>
                <EditForm
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
                    className='inline-flex btn sm:w-auto btn--outline outline-r items-center group'
                    onClick={() => {
                      router.back();
                    }}>
                    <p className='sm:text-base'>回上頁</p>
                    <svg
                      className='h-5 w-5 ml-2 group-hover:rotate-180 duration-300 ease-in-out transition-all'
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
                    type='button'
                    className='inline-flex btn sm:w-auto btn--outline outline-l group'
                    onClick={() => {
                      if (!formik.isValid) {
                        toast.error('請先填寫通報表', { icon: '‼️' });
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
                      className='h-5 w-5 ml-2 group-hover:animate-bounce duration-300 ease-in-out transition-all'
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
                    className={`inline-flex btn sm:w-auto btn--outline outline-r items-center group ${
                      !formik.isValid || formik.isSubmitting
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                    disabled={!formik.isValid || formik.isSubmitting}>
                    <p className='sm:text-base'>送出</p>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 ml-2 group-hover:translate-x-2 duration-300 ease-in-out transition-all'
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
};

export default ReportDetailPage;

export const getServerSideProps = async context => {
  const { id } = context.query;
  const response = await axios(`/getReportDetail?reportId=${id}`);

  const data = await response.json();
  return {
    props: {
      detail: data,
    },
  };
};
