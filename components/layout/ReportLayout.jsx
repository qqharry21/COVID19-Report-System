/** @format */

import { useRouter } from 'next/router';
import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import { ReportTable } from '../report';
import Link from 'next/link';

const ReportLayout = ({ data }) => {
  const router = useRouter();
  const date = moment().format('MM/DD');
  const [showLength, setShowLength] = useState(() => {
    if (data?.length > 10) return 10;
    else return data?.length;
  });
  const [todayLength, setTodayLength] = useState(0);
  const [yesterdayLength, setYesterdayLength] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [emergencyData, setEmergencyData] = useState([]);
  const [searchString, setSearchString] = useState('');

  const handleShowLength = length => {
    if (data?.length < length) setShowLength(data?.length);
    else setShowLength(length);
    let details = document.getElementById('detail_length');
    details.removeAttribute('open');
  };

  useEffect(() => {
    const todayData = data.filter(item => {
      let date = moment(item.date).format('YYYYMMDD') + item.time.replace(':', '');
      let today = moment().format('YYYYMMDD') + '2300';
      let yesterday = moment().subtract(1, 'days').format('YYYYMMDD') + '2300';
      return yesterday <= date && date <= today;
    });
    const yLength = data.filter(item => {
      let date = moment(item.date).format('YYYYMMDD') + item.time.replace(':', '');
      let yesterday = moment().subtract(1, 'days').format('YYYYMMDD') + '2300';
      let lastDay = moment().subtract(2, 'days').format('YYYYMMDD') + '2300';
      return lastDay <= date && date <= yesterday;
    }).length;
    setTodayLength(todayData.length);
    setYesterdayLength(yLength);
    const emergencyData = todayData.filter(item => !item.emergency.includes('一般'));
    setEmergencyData(emergencyData);
  }, []);

  useEffect(() => {
    if (searchString) {
      const filterData = data.filter(item => {
        return item?.id === searchString || item?.date.replace(/-/g, '').slice(-4) === searchString;
      });
      setReportData(filterData.slice(0 - showLength));
    } else {
      setReportData(data.slice(0 - showLength));
    }
  }, [data, searchString, showLength]);

  return (
    <section className='bg-gray-200 w-full flex flex-col justify-center space-y-4 p-4 sm:p-8 '>
      <div className='w-fit mx-auto'>
        <div className='bg-white rounded-lg shadow-lg flex flex-col space-y-4 p-4 sm:p-8 '>
          <div className='flex items-center justify-center'>
            <h2 className='justify-center mb-1 font-semibold text-main text-center'>
              COVID-19&nbsp;
              <p className='text-center'>
                {router.pathname === '/report' ? '受理案件' : `今日(${date})受理案件數`}
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
              <div className='grid py-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {emergencyData?.map((item, index) => (
                  <Link key={index} href={`/report/${item.id}`} passHref>
                    <p className='bg-gray-200 cursor-pointer flex justify-center py-2 px-4 hover:scale-95 hover:shadow-sm rounded-full text-teal-500 hover:text-red-500 duration-200 transition-all ease-in-out'>
                      編號&nbsp;{item.id}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}
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
      <div className='flex flex-col w-full justify-center space-y-4'>
        {reportData.length > 0 ? (
          <>
            <div className='flex justify-between items-center'>
              {searchString !== '' ? (
                <>
                  <h4 className='text-gray-600'>
                    查詢範圍共&nbsp;
                    <span className='text-main font-bold'>{reportData?.length}</span>&nbsp;件
                  </h4>
                  <h4 className='text-gray-600'>查詢範圍 &quot;{searchString}&quot; 的結果</h4>
                </>
              ) : (
                <>
                  <details className='group relative'>
                    <summary className='flex items-center justify-between p-2 bg-white text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700'>
                      <svg
                        className='w-5 h-5 opacity-75'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='14' cy='6' r='2' />
                        <line x1='4' y1='6' x2='12' y2='6' /> <line x1='16' y1='6' x2='20' y2='6' />
                        <circle cx='8' cy='12' r='2' /> <line x1='4' y1='12' x2='6' y2='12' />
                        <line x1='10' y1='12' x2='20' y2='12' /> <circle cx='17' cy='18' r='2' />
                        <line x1='4' y1='18' x2='15' y2='18' />
                        <line x1='19' y1='18' x2='20' y2='18' />
                      </svg>
                    </summary>

                    <nav className='mt-1 flex flex-col bg-white shadow-md rounded-lg absolute w-44 z-50'>
                      <button
                        onClick={() => {
                          handleShowLength(data?.length || 0);
                        }}
                        className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                        <span className=' text-sm font-medium flex justify-center flex-1'>
                          全部
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          handleShowLength(30);
                        }}
                        className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                        <span className='text-sm font-medium flex justify-center flex-1'>
                          30 筆
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          handleShowLength(20);
                        }}
                        className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                        <span className='text-sm font-medium flex justify-center flex-1'>
                          20 筆
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          handleShowLength(10);
                        }}
                        className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                        <span className='text-sm font-medium flex justify-center flex-1'>
                          10 筆
                        </span>
                      </button>
                    </nav>
                  </details>
                  <details className='group w-44 relative' id='detail_length'>
                    <summary className='flex items-center justify-between px-4 py-2 bg-white text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700'>
                      <svg
                        className='w-5 h-5 opacity-75'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <polyline points='6 21 21 6 18 3 3 18 6 21' />
                        <line x1='15' y1='6' x2='18' y2='9' />
                        <path d='M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2' />
                        <path d='M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2' />
                      </svg>

                      <span className='text-sm font-medium flex justify-center flex-1'>
                        顯示近 {showLength} 筆
                      </span>

                      <span className='transition duration-300 shrink-0 group-open:-rotate-180'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          viewBox='0 0 20 20'
                          fill='currentColor'>
                          <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                    </summary>

                    <nav className='mt-1 flex flex-col bg-white shadow-md rounded-lg absolute w-44'>
                      <button
                        onClick={() => {
                          handleShowLength(data?.length || 0);
                        }}
                        className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                        <span className=' text-sm font-medium flex justify-center flex-1'>
                          全部
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          handleShowLength(30);
                        }}
                        className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                        <span className='text-sm font-medium flex justify-center flex-1'>
                          30 筆
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          handleShowLength(20);
                        }}
                        className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                        <span className='text-sm font-medium flex justify-center flex-1'>
                          20 筆
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          handleShowLength(10);
                        }}
                        className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                        <span className='text-sm font-medium flex justify-center flex-1'>
                          10 筆
                        </span>
                      </button>
                    </nav>
                  </details>
                </>
              )}
            </div>

            <ReportTable data={reportData} />
            <div className='flex justify-between items-start text-gray-600'>
              <div className=''>
                <h4 className='flex justify-center items-center'>
                  總共&nbsp;
                  <span className='text-main font-bold'>{data?.length}</span>&nbsp;件
                </h4>
              </div>
              <div className='flex flex-col justify-end'>
                <h4 className='flex justify-end items-center'>
                  今日總共&nbsp;
                  <span className='text-main font-bold'>{todayLength}</span>&nbsp;件
                </h4>
                <h4 className='flex justify-end items-center'>
                  昨日總共&nbsp;
                  <span className='text-main font-bold'>{yesterdayLength}</span>&nbsp;件
                </h4>
              </div>
            </div>
          </>
        ) : (
          <div className='mx-auto'>
            <h3 className='text-gray-600'>
              查無與&nbsp;&quot;{searchString}&quot;&nbsp;相符的資料
            </h3>
          </div>
        )}
      </div>
      <div className='flex justify-center items-center space-x-2'>
        <Link
          href={`https://docs.google.com/spreadsheets/d/1g6WrUURvJjMZxmtvPusysen9I2-bfAExnVdq1H63OCY/export`}>
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
