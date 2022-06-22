/** @format */

import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { Input } from '../components/form/field';
import { getSession, signIn } from 'next-auth/react';
import { onKeyDown } from '../utils/CommonUtils';
import { loginSchema } from '../utils/validate';
import { useRouter } from 'next/router';
import { Meta } from '../components';

const Login = () => {
  const router = useRouter();
  const handleSubmit = async (values, actions) => {
    const loadingToast = toast.loading('登入中...');
    const { username, password } = values;
    const options = { redirect: false, username, password };
    try {
      const response = await signIn('credentials', options);

      if (!response.error) {
        toast.success('登入成功', { id: loadingToast });
        router.push('/');
      }
    } catch (error) {
      console.log('🚨 ~ handleSubmit ~ error', error);
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

        <p className='max-w-md mx-auto mt-4 text-center text-gray-500'>需登入後才可使用</p>

        <Formik
          initialValues={{ username: 'Test', password: '00000' }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}>
          {formik => {
            return (
              <Form
                className='p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl'
                autoComplete='off'
                noValidate
                onKeyDown={onKeyDown}>
                <p className='text-xl font-medium text-center text-main'>登入</p>
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
                  登入
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default Login;
