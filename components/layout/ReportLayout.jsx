/** @format */

import { useState, useEffect } from 'react';
import { ReportTable } from '../report';
import Link from 'next/link';
import { FilterDropdown } from '../report';
import { initialFilter } from '../../lib/data';
import axios from '../../lib/config/axios';
import toast from 'react-hot-toast';

const ReportLayout = ({ data }) => {
  const [todayLength, setTodayLength] = useState(0);
  const [yesterdayLength, setYesterdayLength] = useState(0);
  const [reportData, setReportData] = useState(data);
  const [emergencyData, setEmergencyData] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filter, setFilter] = useState(initialFilter);

  const closeDropdown = () => {
    let details = document.getElementById('filter');
    details.removeAttribute('open');
  };

  useEffect(() => {
    async function getTodayData() {
      const data = await axios
        .post('/reports/search', {
          option: 'today',
        })
        .then(res => res.data);
      setTodayLength(data.length);
      const emergencyData = data.filter(item => !item.emergency.includes('一般'));
      setEmergencyData(emergencyData);
    }
    async function getYesterday() {
      const data = await axios
        .post('/reports/search', {
          option: 'yesterday',
        })
        .then(res => res.data);
      setYesterdayLength(data.length);
    }
    getTodayData();
    getYesterday();
  }, []);

  useEffect(() => {
    if (searchString) {
      getSearchData();
    } else if (filter !== initialFilter) {
      getFilterData();
    } else setReportData(data);

    async function getFilterData() {
      const data = await axios.post('/reports/search', filter).then(res => res.data);
      setReportData(data);
    }

    async function getSearchData() {
      const data = await axios.get(`/reports/search?query=${searchString}`).then(res => res.data);
      setReportData(data);
    }
  }, [searchString, filter]);

  const handleExport = async () => {
    await axios
      .post('/reports/export', reportData, { responseType: 'blob' })
      .then(async res => {
        if (res.status === 200) {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', '防疫確診統計總表.csv');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        }
      })
      .catch(error => {
        console.log(error);
        toast.error('匯出失敗');
      });
  };

  return (
    <section className='flex flex-col justify-center w-full p-4 space-y-4 bg-gray-200 sm:p-8'>
      <div className='mx-auto w-fit'>
        <div className='flex flex-col p-4 space-y-4 bg-white rounded-lg shadow-lg sm:p-8 '>
          <div className='flex items-center justify-center'>
            <h2 className='justify-center mb-1 font-semibold text-center text-main'>
              COVID-19&nbsp;
              <p className='text-center'>受理案件</p>
            </h2>
          </div>
          <hr className='w-[80%] mx-auto justify-center' />
          {emergencyData && (
            <>
              <div className='items-center text-center '>
                今日危急/嚴重個案數 共&nbsp;
                <span className='text-teal-500'>{emergencyData?.length}</span>&nbsp;筆
              </div>
              <div className='grid grid-cols-2 gap-2 py-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {emergencyData?.map((item, index) => (
                  <Link key={index} href={`/reports/${item.reportId}`} passHref>
                    <p className='flex justify-center px-4 py-2 text-teal-500 transition-all duration-200 ease-in-out bg-gray-200 rounded-full cursor-pointer hover:scale-95 hover:shadow-sm hover:text-red-500'>
                      編號&nbsp;{item.reportId}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* 查詢框 */}
      <div className='flex items-center justify-center mb-0'>
        <div className='relative'>
          <input
            className='w-64 h-10 pr-10 text-sm placeholder-gray-300 border-gray-200 rounded-lg focus:z-10'
            placeholder='輸入案件編號...'
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
      <div className='flex flex-col justify-center w-full space-y-4'>
        <div className='flex items-center justify-between'>
          {searchString !== '' ? (
            <>
              <h4 className='text-gray-600'>
                查詢範圍共&nbsp;
                <span className='font-bold text-main'>{reportData?.length}</span>&nbsp;件
              </h4>
              <h4 className='text-gray-600'>查詢範圍 &quot;{searchString}&quot; 的結果</h4>
            </>
          ) : (
            <>
              {/* 篩選條件 */}
              <details className='relative group' id='filter'>
                <summary className='flex items-center justify-between px-4 py-2 text-gray-500 bg-white rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700'>
                  <svg
                    className='w-5 h-5 mr-2 opacity-75'
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
                  <span className='flex justify-center flex-1 text-sm font-medium'>篩選條件</span>
                </summary>
                <FilterDropdown setFilter={setFilter} close={closeDropdown} />
              </details>
            </>
          )}
        </div>
        {reportData.length > 0 ? (
          <>
            <ReportTable data={reportData} />
            <div className='flex items-start justify-between text-gray-600'>
              <div className=''>
                <h4 className='flex items-center justify-center'>
                  總共&nbsp;
                  <span className='font-bold text-main'>{data?.length}</span>&nbsp;件
                </h4>
              </div>
              <div className='flex flex-col justify-end'>
                <h4 className='flex items-center justify-end'>
                  今日總共&nbsp;
                  <span className='font-bold text-main'>{todayLength}</span>&nbsp;件
                </h4>
                <h4 className='flex items-center justify-end'>
                  昨日總共&nbsp;
                  <span className='font-bold text-main'>{yesterdayLength}</span>&nbsp;件
                </h4>
              </div>
            </div>
          </>
        ) : (
          <div className='mx-auto'>
            <h3 className='text-gray-600'>查無相符的資料</h3>
          </div>
        )}
      </div>
      <div className='flex items-center justify-center space-x-2'>
        {reportData.length > 0 && (
          <button
            className='inline-flex btn btn--outline outline-r w-fit group'
            type='button'
            onClick={handleExport}>
            <p className=''>產出Excel</p>
            <svg
              className='w-5 h-5 ml-2 transition-all duration-300 ease-in-out group-hover:translate-x-2'
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
        )}
      </div>
    </section>
  );
};

export default ReportLayout;
