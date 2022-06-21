/** @format */

import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Meta } from '../components';
import { Input } from '../components/form/field';
import axios from '../lib/config/axios';
import { onKeyDown, sleep } from '../utils/CommonUtils';
import { registerSchema } from '../utils/validate';

const Register = () => {
  const handleSubmit = async (values, actions) => {
    const loadingToast = toast.loading('註冊中...');

    try {
      const response = await axios.post('/register', {
        data: { ...values, roles: { User: 2001, Editor: 1984, Admin: 5150 } },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        sleep(1000);
        toast.success(response.data.message, { id: loadingToast });
      }
    } catch (error) {
      toast.error(error.response.data?.message, { id: loadingToast });
    }

    actions.setSubmitting(false);
  };
  return (
    <div className='flex items-center max-w-screen-xl min-h-screen px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <Meta title='登入' description='登入頁面' />
      <div className='max-w-lg mx-auto'>
        <h1 className='text-2xl md:!text-4xl font-bold text-center text-main sm:text-3xl'>
          新竹市消防局常用系統
        </h1>

        <p className='max-w-md mx-auto mt-4 text-center text-gray-500'>需先註冊</p>

        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}>
          {formik => {
            return (
              <Form
                className='p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl'
                autoComplete='off'
                noValidate
                onKeyDown={onKeyDown}>
                <p className='text-xl font-medium text-center text-main'>註冊</p>
                <Field
                  label='使用者代號'
                  name='username'
                  placeholder='輸入使用者代號'
                  type='text'
                  component={Input}
                  isRequired
                  formik={formik}
                />
                <Field
                  label='信箱'
                  name='email'
                  placeholder='輸入信箱'
                  type='text'
                  component={Input}
                  isRequired
                  formik={formik}
                />
                <Field
                  label='密碼'
                  name='password'
                  placeholder='輸入6位密碼'
                  type='password'
                  component={Input}
                  isRequired
                  formik={formik}
                />
                <button
                  type='submit'
                  className={`w-full btn btn--outline outline-r text-main border-main hover:text-white before:bg-main ${
                    !(formik.dirty && formik.isValid) || formik.isSubmitting
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                  disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                  註冊
                </button>
                <p className='text-sm text-center text-gray-500'>
                  已經有帳戶?
                  <Link href='/login'>
                    <a className='ml-2 link link--outline hover:text-main before:bg-main'>登入</a>
                  </Link>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Register;

export const getServerSideProps = async ctx => {};
