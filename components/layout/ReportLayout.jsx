/** @format */

import { useRouter } from 'next/router';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { ReportTable } from '../report';
import Link from 'next/link';

const ReportLayout = ({ data }) => {
  const router = useRouter();
  const date = moment().format('MM/DD');
  const [todayLength, setTodayLength] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [emergencyData, setEmergencyData] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (data?.length > 20) data.slice(-20);
    setReportData(data);
  }, []);

  useEffect(() => {
    const todayData = data.filter(
      item => moment(item.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
    );
    const todayLength = todayData.length;
    setTodayLength(todayLength);
    const emergencyData = todayData.filter(item => item.emergency.value === true);
    setEmergencyData(emergencyData);
  }, []);

  useEffect(() => {
    if (searchString) {
      const filterData = data.filter(item => {
        return item?.id === searchString || item?.date === searchString;
      });

      setReportData(filterData);
    } else [setReportData(data)];
  }, [data, searchString]);

  return (
    <section className='bg-gray-200 w-full flex flex-col justify-center space-y-4'>
      <div className='p-4 sm:p-8 w-fit mx-auto'>
        <div className='bg-white rounded-lg shadow-lg flex flex-col space-y-4 p-4 sm:p-8 '>
          <div className='flex items-center justify-center'>
            <h2 className='justify-center mb-1 font-semibold text-main text-center'>
              COVID-19&nbsp;
              <p className='text-center'>
                {router.pathname === '/report' ? '受理案件數最近20筆' : `今日(${date})受理案件數`}
              </p>
            </h2>
          </div>
          <hr className='w-[80%] mx-auto justify-center' />
          {emergencyData && (
            <>
              <div className='text-center items-center '>
                今日危急個案數 共&nbsp;
                <span className='text-teal-500'>{emergencyData?.length}</span>&nbsp;筆
              </div>
              <div className='grid py-2 grid-cols-6 gap-2'>
                {emergencyData?.map((item, index) => (
                  <Link key={index} href={`/report/${item.id}`} passHref>
                    <p className='text-gray-400 cursor-pointer hover:text-teal-500 duration-200 transition-all ease-in-out'>
                      編號&nbsp;{item.id}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* {router.pathname === '/report' && (
            <div className='p-2 grid grid-cols-2 gap-4'>
              <p className=''>
                今年確診數：
                <span className='text-teal-500'>{total?.year}</span>
              </p>
              <p className=''>
                當月確診數：
                <span className='text-teal-500'>{total?.month}</span>
              </p>
              <p className=''>
                當周確診數：<span className='text-teal-500'>{total?.week}</span>
              </p>
              <p className=''>
                昨日確診數：<span className='text-teal-500'>{total?.yesterday}</span>
              </p>
              <p className='col-span-2 text-center'>
                今日確診數：<span className='text-teal-500'>{total?.today}</span>
              </p>
            </div>
          )} */}
        </div>
      </div>
      <div className='mb-0 flex justify-center items-center'>
        <div className='relative'>
          <input
            className='h-10 pr-10 text-sm placeholder-gray-300 border-gray-200 rounded-lg focus:z-10 w-64'
            placeholder='輸入案件編號或日期...'
            type='text'
            name='search'
            onChange={e => {
              setSearchString(e.target.value);
            }}
          />

          <button
            className='absolute inset-y-0 right-0 p-2 mr-px text-gray-600 rounded-r-lg'
            type='button'>
            <svg
              className='w-5 h-5 text-teal-500'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                clipRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                fillRule='evenodd'></path>
            </svg>
          </button>
        </div>
      </div>
      <div className='flex flex-col w-full p-4 sm:p-8 justify-center'>
        <ReportTable data={reportData} />
        <p className='flex justify-end p-2  font-semibold'>
          今日總筆數&nbsp;
          <span className='text-main font-bold'>{todayLength}</span>&nbsp;件
        </p>
      </div>
      <div className='flex justify-center py-2'>
        <Link href={`https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/export`}>
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
        </Link>
      </div>
    </section>
  );
};

export default ReportLayout;
// 之後 turn to event detail page
