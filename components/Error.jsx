/** @format */

import Link from 'next/link';
import React from 'react';
import { Layout } from './layout';

const Error = () => {
  return (
    <Layout title='錯誤'>
      <div className='flex h-screen mx-auto items-center'>
        <div className='relative py-8 px-20 text-center border bg-white border-gray-200 rounded-lg flex flex-col space-y-6'>
          <h2 className='font-medium flex justify-center items-center '>
            <span className='mr-4'>
              <svg
                className='h-10 w-10 text-teal-500'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </span>
            查無資料
          </h2>

          <p className='mt-4 text-gray-500'>請新增一筆案件</p>
          <Link href=''>
            <a className='inline-flex btn btn--outline outline-r'>
              新增
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='flex-shrink-0 w-4 h-4 ml-3'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Error;
