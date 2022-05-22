/** @format */

import { useRouter } from 'next/router';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { ReportTable } from '../report';
import Image from 'next/image';
const ReportLayout = ({ data, lengths }) => {
  const router = useRouter();
  const date = moment().format('MM/DD');
  const [filterData, setFilterData] = useState(data);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000);
  }, [mounted]);

  return (
    <section className='bg-gray-200 w-full flex flex-col justify-center space-y-4'>
      <div className='p-4 sm:p-8 w-fit mx-auto'>
        <div className='bg-white rounded-lg shadow-lg flex flex-col space-y-4 p-4 sm:p-8 '>
          <div className='flex items-center justify-center'>
            <h2 className='justify-center mb-1 font-semibold text-main'>
              COVID-19&nbsp;
              <p className='text-center'>
                {router.pathname === '/report' ? '確診數總計' : `今日(${date})確診數`}
              </p>
            </h2>
          </div>
          <hr className='w-[80%] mx-auto justify-center' />
          <div
            className='p-2 grid grid-cols-2 gap-4'
            onClick={e => {
              navigator.clipboard.writeText(e.target.innerText);
            }}>
            {router.pathname === '/report' ? (
              <>
                <p className=''>
                  今年確診數：
                  <span className='text-teal-500'>{lengths?.year}</span>
                </p>
                <p className=''>
                  當月確診數：
                  <span className='text-teal-500'>{lengths?.month}</span>
                </p>
                <p className=''>
                  當周確診數：<span className='text-teal-500'>{lengths?.week}</span>
                </p>
                <p className=''>
                  昨日確診數：<span className='text-teal-500'>{lengths?.yesterday}</span>
                </p>
                <p className='col-span-2 text-center'>
                  今日確診數：<span className='text-teal-500'>{lengths?.today}</span>
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className='flex w-full p-4 sm:p-8 justify-center'>
        {mounted || !data ? (
          <ReportTable data={filterData} />
        ) : (
          <div className='relative w-full h-20'>
            <Image src='/loader.gif' alt='loading' layout='fill' objectFit='contain' />
          </div>
        )}
      </div>
      <div className='flex justify-center py-2'>
        <button className='btn btn--outline outline-r inline-flex w-fit group' type='button'>
          <p className=''>產出Excel</p>
          <svg
            className='h-5 w-5 ml-2 group-hover:translate-x-2 duration-300 ease-in-out transition-all'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' />
            <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
            <path d='M7 12h14l-3 -3m0 6l3 -3' />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ReportLayout;
// 之後 turn to event detail page
