/** @format */

import { Field, Form, Formik } from 'formik';
import React from 'react';
import { changePasswordSchema } from '../../utils/validate';
import { Input } from '../form/field';
import { signOut } from 'next-auth/react';
import axios from '../../lib/config/axios';
import toast from 'react-hot-toast';

const PasswordPanel = ({ user }) => {
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    const loadingToast = toast.loading('更改中...');
    try {
      const res = await axios.put('/changePassword', values);
      if (res.status === 200) {
        toast.success(res.data.message, { id: loadingToast });
        signOut();
      }
    } catch (error) {
      console.log('🚨 ~ handleSubmit ~ error', error);
      toast.error(error.response.data.message, { id: loadingToast });
    }
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '', username: user.username }}
      validationSchema={changePasswordSchema}
      onSubmit={handleSubmit}>
      {formik => {
        return (
          <Form className='grid grid-cols-2 gap-6'>
            <div className='col-span-2 md:col-span-1'>
              <Field
                label='更改密碼'
                name='password'
                placeholder='輸入6位以上密碼'
                type='password'
                component={Input}
                isRequired
                formik={formik}
              />
            </div>

            <div className='col-span-2 md:col-span-1'>
              <Field
                label='確認密碼'
                name='confirmPassword'
                placeholder='再次輸入密碼'
                type='password'
                component={Input}
                isRequired
                formik={formik}
              />
            </div>

            <div className='flex items-center justify-center w-full col-span-2 h-fit'>
              <button className='btn btn--outline outline-m' type='submit'>
                確認更改
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PasswordPanel;
