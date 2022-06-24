/** @format */

import React, { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { Layout } from '../components/layout';
import { Meta } from '../components';
import { isAdmin } from '../utils/verifyRoles';
import { Dashboard, DetailPanel, PermissionPanel } from '../components/dashboard';

const Admin = () => {
  const { data: session } = useSession();

  const [step, setStep] = useState(0);

  const toggleTab = index => {
    const tabs = document.querySelectorAll('.tab');
    tabs[step].classList.remove('active-tab');
    tabs[index].classList.add('active-tab');
    setStep(index);
  };

  return (
    <Layout meta={<Meta title='設定' description='Setting page' />}>
      <section className='items-center justify-center w-full mx-auto max-w-7xl'>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          {/* Content */}
          <div className='flex flex-col items-center space-y-4'>
            {/* Form */}
            <div className='w-full px-4 py-8 bg-white rounded-lg shadow-lg h-fit sm:p-12'>
              <div className='pb-4'>
                <div className='flex flex-col items-center justify-center pb-4 space-x-2'>
                  <h1 className='!text-4xl font-bold tracking-wider text-main text-center'>設定</h1>
                </div>
                <hr className='border-gray-200 w-full xs:w-[50%] mx-auto' />
              </div>
              <div className='h-full my-2 rounded-md bg-slate-50'>
                <div className='flex flex-col h-full p-2 sm:p-4'>
                  {/* Tab */}

                  <ul className='flex overflow-scroll border-b border-gray-100 scrollbar-hide '>
                    <li
                      className='w-full whitespace-nowrap'
                      onClick={() => {
                        toggleTab(0);
                      }}>
                      <div className='relative block p-4 cursor-pointer tab active-tab '>
                        <div className='flex items-center justify-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='flex-shrink-0 w-5 h-5 text-gray-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                            />
                          </svg>
                          <span className='ml-3 text-sm font-medium text-gray-900'> 更改資料 </span>
                        </div>
                      </div>
                    </li>
                    {isAdmin(session?.user.roles) && (
                      <>
                        <li
                          className='w-full whitespace-nowrap '
                          onClick={() => {
                            toggleTab(1);
                          }}>
                          <div className='relative block p-4 cursor-pointer tab '>
                            <div className='flex items-center justify-center'>
                              <svg
                                className='flex-shrink-0 w-5 h-5 text-gray-500'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
                                />
                              </svg>

                              <span className='ml-3 text-sm font-medium text-gray-900'>
                                權限調整
                              </span>
                            </div>
                          </div>
                        </li>
                        {/* <li
                          className='w-full whitespace-nowrap '
                          onClick={() => {
                            toggleTab(2);
                          }}>
                          <div className='relative block p-4 cursor-pointer tab'>
                            <div className='flex items-center justify-center'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='flex-shrink-0 w-5 h-5 text-gray-500'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                                />
                              </svg>

                              <span className='ml-3 text-sm font-medium text-gray-900'>
                                通知設定
                              </span>
                            </div>
                          </div>
                        </li> */}
                      </>
                    )}
                  </ul>

                  {/* Panel */}
                  <Dashboard step={step} user={session?.user}>
                    <DetailPanel />
                    <PermissionPanel />
                  </Dashboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
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
