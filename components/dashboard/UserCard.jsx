/** @format */

import { Field, Form, Formik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import axios from '../../lib/config/axios';

const UserCard = ({ user }) => {
  console.log('🚨 ~ UserCard ~ user', user);
  const handleSubmit = async (values, actions) => {
    const loadingToast = toast.loading('更改中...');
    await axios
      .put('/admin/users', values)
      .then(res => {
        if (res.status === 200) {
          toast.success(res.data.message, { id: loadingToast });
        }
      })
      .catch(error => {
        toast.error(error.response.data.message, { id: loadingToast });
      });
    actions.setSubmitting(false);
  };

  const handleDelete = async e => {
    e.preventDefault();
    toast.custom(
      t => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}>
          <div className='flex justify-center w-full p-4 border-b border-gray-200'>
            <div className='flex items-center'>
              <p className='text-2xl'>⚠️</p>
              <div className='flex-1 ml-3'>
                <p className='text-base font-medium text-gray-900'>確定要刪除該用戶嗎？</p>
              </div>
            </div>
          </div>
          <div className='flex'>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await deleteProcess();
              }}
              className='flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-l-lg btn btn--outline outline-l text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
              是
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
              className='flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-r-lg btn btn--outline outline-r text-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main/50'>
              否
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };
  const deleteProcess = async () => {
    const deleteToast = toast.loading('删除中...');
    await axios
      .delete(`/admin/users?id=${user._id}`)
      .then(res => {
        if (res.status === 200) {
          toast.success(res.data.message, { id: deleteToast });
        } else if (res.status === 204) {
          toast.error('查無此用戶', { id: loadingToast });
        }
      })
      .catch(error => {
        toast.error(error.response.data.message, { id: deleteToast });
      });
  };

  return (
    <Formik
      initialValues={{ id: user._id, role: Object.keys(user.roles).pop() }}
      onSubmit={handleSubmit}>
      {formik => (
        <Form className='transition-shadow duration-200 ease-out rounded-lg shadow-md hover:shadow-lg '>
          <div className='flex flex-col max-w-lg px-6 py-4 mx-auto space-y-2'>
            <h5 className='text-2xl font-bold text-center text-main'>{user.username}</h5>
            <Field as='select' name='role' className='select'>
              <option value='User'>檢視者（查閱資料）</option>
              <option value='Editor'>編輯者（增改資料）</option>
              <option value='Admin'>管理者（刪改資料）</option>
            </Field>
            <div className='grid grid-cols-2 gap-2'>
              <button
                type='button'
                className='w-full col-span-2 px-4 py-1 mt-2 text-red-500 border-red-500 whitespace-nowrap sm:col-span-1 before:bg-red-500 btn btn--outline outline-l '
                onClick={handleDelete}>
                刪除用戶
              </button>
              <button
                type='submit'
                className={`col-span-2 sm:col-span-1 w-full px-4 py-1 mt-2 btn btn--outline outline-r ${
                  !(formik.dirty && formik.isValid) || formik.isSubmitting
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                變更
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserCard;
