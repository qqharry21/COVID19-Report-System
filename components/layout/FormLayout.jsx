/** @format */

import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Children, useState } from 'react';
import { sleep } from '../../utils/CommonUtils';
import { initialSchema } from '../../utils/validate';
import CustomForm from '../form/CustomForm';
import Success from '../form/Success';

const FormLayout = ({ children }) => {
  const router = useRouter();

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
                  <h3 className='text-primary-orange font-semibold text-center'>
                    消防局受理防疫案件通報
                  </h3>
                </div>
                <hr className='border-gray-200 w-full xs:w-[50%] mx-auto' />
              </div>
              <Formik
                initialValues={{
                  reportId: '',
                  method: '',
                  category: '',
                  date: '',
                  time: '',
                  address: '',
                  patients: [
                    { name: '', birth: '', age: '', sex: '', symptom: '', id: '', phone: '' },
                  ],
                  accompany: [{ name: '', birth: '', age: '', sex: '', id: '', phone: '' }],
                  car: '',
                  hospital: '',
                  detail: '',
                  member: '',
                  captain: '',
                }}
                validationSchema={initialSchema} //這裡還要再改，須根據每個分頁來做表單驗證
                onSubmit={handleSubmit}>
                {formik => {
                  return (
                    <Form autoComplete='off' className='flex flex-col justify-between h-full'>
                      <CustomForm {...formik} />
                      <div
                        className={`mt-10 flex space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 flex-col sm:flex-row ${
                          1 ? 'justify-center' : 'justify-end'
                        }`}>
                        <button
                          type='button'
                          className='inline-flex btn sm:w-auto btn--outline outline-l'
                          onClick={() => setStep(s => s - 1)}>
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
                          className='inline-flex btn sm:w-auto btn--outline outline-r items-center '>
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
