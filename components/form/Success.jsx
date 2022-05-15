/** @format */

import React from 'react';

const Success = ({ onFinish, type }) => {
  return (
    <section className='shadow-2xl rounded-3xl max-w-screen-md w-full'>
      <div className='p-8 text-center sm:p-12'>
        <p className='font-semibold tracking-widest text-main uppercase flex space-x-2 justify-center items-center'>
          <span className='-scale-x-100'>🎉</span>
          <span className=''>報名成功</span>
          <span className=''>🎉</span>
        </p>

        <h5 className='mt-6 font-medium'>
          <p className='text-lg md:text-2xl'>謝謝您的報名</p>
          <p className='text-lg md:text-2xl'>我們將會盡快與您聯絡</p>
        </h5>

        <button
          className='inline-flex justify-center items-center w-full py-4 mt-8 font-bold btn btn--outline outline-r rounded-full shadow-md hover:shadow-xl duration-200 transition-shadow ease-in-out'
          onClick={onFinish}>
          查看其他活動
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
        </button>
      </div>
    </section>
  );
};

export default Success;
