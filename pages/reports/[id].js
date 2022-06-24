/** @format */

import React, { useRef, useState } from 'react';
import { FormLayout, Layout } from '../../components/layout';
import { Form, Formik } from 'formik';
import { initialSchema } from '../../utils/validate';
import { generateCopyText, onKeyDown, sleep } from '../../utils/CommonUtils';
import toast from 'react-hot-toast';
import { EditForm } from '../../components/form';
import { useRouter } from 'next/router';
import axios from '../../lib/config/axios';
import { Meta } from '../../components';
import { getSession, useSession } from 'next-auth/react';
import { useLeavePageConfirm } from '../../hooks/useLeavePageConfirm';
import { isEditor } from '../../utils/verifyRoles';

// const fetcher = async (url, id) => {
//   return axios.get(url, { params: { reportId: id } }).then(res => res.data);
// };
// const { id } = router.query;
// const { data, error } = useSWR(id ? [`${server}/api/getReportDetail`, id] : null, fetcher);

const ReportDetailPage = ({ detail }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [copyText, setCopyText] = useState('');
  const textareaRef = useRef();

  const handleSubmit = async (values, actions) => {
    const loadingToast = toast.loading('編輯中...');
    //提交表單
    try {
      const res = await axios.put(`/reports?id=${values._id}`, values);
      if (res.status === 201) {
        await sleep(1000);
        toast.success(res.data, { id: loadingToast });
        router.push('/reports');
      } else if (res.status === 204) {
        toast.error('查無此資料', { id: loadingToast });
        router.push('/reports');
      } else throw new Error(res.data);
    } catch (error) {
      console.log('🚨 ~ handleSubmit ~ error', error);
      toast.error('發生錯誤，稍後再試', { id: loadingToast });
    }

    actions.setSubmitting(false);
  };

  const handleCopy = async formik => {
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
                  toast.success('已複製至剪貼簿', { id: t.id, duration: 800 });
                }}
                className='flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-l-lg btn btn--outline outline-l text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
                是
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  setCopyText(currentText);
                  navigator.clipboard.writeText(currentText);
                  toast.success('已複製到剪貼簿', { id: t.id, duration: 800 });
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
      toast.success('已複製到剪貼簿', { duration: 800 });
    }
  };

  const handleDelete = async () => {
    toast.custom(
      t => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}>
          <div className='flex justify-center w-full p-4 border-b border-gray-200'>
            <div className='flex items-center'>
              <p className='text-2xl'>⚠️</p>
              <div className='flex-1 ml-3'>
                <p className='text-base font-medium text-gray-900'>確定是否刪除該筆案件?</p>
              </div>
            </div>
          </div>
          <div className='flex'>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading('刪除中...');
                try {
                  const res = await axios.delete(`/reports?id=${detail._id}`);
                  if (res.status === 201) {
                    await sleep(1000);
                    toast.success(res.data, { id: loadingToast });
                    router.push('/reports');
                  } else if (res.status === 204) {
                    toast.error('查無此資料', { id: loadingToast });
                    router.push('/reports');
                  }
                } catch (error) {
                  console.log('🚨 ~ handleDelete ~ error', error);
                  toast.error('發生錯誤，稍後再試', { id: loadingToast });
                }
              }}
              className='flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-l-lg btn btn--outline outline-l text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
              確定刪除
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toast.success('已取消', { id: t.id, duration: 1000, icon: '❌' });
              }}
              className='flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-r-lg btn btn--outline outline-r text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
              取消
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  return (
    <Layout
      meta={
        <Meta title={`案件${detail.reportId}`} description={`Report ${detail.reportId} details`} />
      }>
      <FormLayout>
        <Formik initialValues={detail} onSubmit={handleSubmit} validationSchema={initialSchema}>
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
                  roles={session.user.roles}
                />
                <div
                  className={`mt-10 flex space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 flex-col sm:flex-row ${
                    1 ? 'justify-center' : 'justify-end'
                  }`}>
                  <button
                    type='button'
                    className='inline-flex items-center btn sm:w-auto btn--outline outline-m group text-main border-main before:bg-main'
                    onClick={() => {
                      router.back();
                    }}>
                    <p className='sm:text-base'>回上頁</p>
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
                  {isEditor(session.user.roles) && (
                    <button
                      type='button'
                      className='inline-flex items-center text-red-500 border-red-500 before:bg-red-500 btn sm:w-auto btn--outline outline-m group'
                      onClick={handleDelete}>
                      <p className='sm:text-base'>刪除</p>
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
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                      </svg>
                    </button>
                  )}
                  {isEditor(session.user.roles) && (
                    <>
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
                                toast.error('請正確填寫通報表內容', { icon: '‼️' });
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
                        className={`inline-flex btn sm:w-auto btn--outline outline-r items-center group ${
                          formik.isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                        disabled={formik.isSubmitting}
                        onClick={() => {
                          formik.validateForm().then(res => {
                            if (Object.keys(res).length !== 0) {
                              const error = Object.keys(res).pop();
                              const errorElement = document.querySelector(`[name="${error}"]`);
                              errorElement.scrollIntoView();
                              errorElement.focus();
                              toast.error('欄位有誤', { icon: '‼️' });
                            }
                          });
                        }}>
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
                    </>
                  )}
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

export const getServerSideProps = async ctx => {
  const { id } = ctx.params;
  const session = await getSession(ctx);
  const data = await axios.get(`/reports?reportId=${id}`).then(res => res.data);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (!data) {
    return {
      redirect: {
        destination: '/reports',
        permanent: false,
      },
    };
  }

  return {
    props: {
      detail: data,
    },
  };
};
