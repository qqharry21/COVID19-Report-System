/** @format */

import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { getOptionName } from '../../utils/CommonUtils';
import { statusOptions, table_column } from '../../utils/data';
const ReportTable = ({ data }) => {
  return (
    <div className='py-2 overflow-x-auto bg-white rounded-lg'>
      <table className='min-w-full text-sm table-auto  divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='sticky left-0 p-4 text-left bg-white'></th>
            {table_column.map((column, index) => (
              <th className='p-4 font-medium text-left text-gray-900 whitespace-nowrap' key={index}>
                <div className='flex items-center justify-center'>
                  {column.title}
                  {/* <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4 ml-1.5 text-gray-700'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg> */}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {data?.map((row, index) => {
            const status = getOptionName(statusOptions, row.status);
            return (
              <tr className='hover:bg-gray-100 duration-200 ease-in group' key={index}>
                <td className='sticky left-0 z-10 p-4 bg-white group-hover:bg-gray-100 duration-200 ease-in'>
                  <Link href={`/report/${row?.id}`} passHref>
                    <svg
                      className='w-5 h-5 link'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      />
                    </svg>
                  </Link>
                </td>
                <td className='p-4 whitespace-nowrap'>
                  <strong
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium text-center ${
                      row?.status === 1
                        ? 'bg-[#fce8b2] text-orange-600'
                        : row?.status === 2
                        ? 'bg-[#b7e1cd] text-green-700'
                        : row?.status === 3
                        ? 'bg-[#e5b8ae] text-red-700'
                        : row?.status === 4
                        ? 'bg-[#d9d2e9] text-purple-700'
                        : ''
                    }`}>
                    {status}
                  </strong>
                </td>
                <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row?.id}</td>
                <td
                  className={`p-4 font-medium ${
                    row?.date === moment().format('YYYY-MM-DD') ? 'text-main' : 'text-gray-900'
                  } whitespace-nowrap text-center`}>
                  {row?.date}
                </td>
                <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row?.time}</td>
                <td
                  className={`p-4 ${
                    row?.emergency === '一般'
                      ? 'text-gray-700'
                      : row?.emergency === '嚴重'
                      ? 'text-purple-700'
                      : 'text-red-700'
                  } whitespace-nowrap text-center`}>
                  {row?.emergency}
                </td>
                <td className='p-4 text-center text-gray-700 whitespace-nowrap'>
                  {row?.emergency_detail}
                </td>
                <td className='p-4 text-gray-700 text-center w-[135px] block justify-center'>
                  {row?.patients.split('\n').map((patient, index) => (
                    <p key={index} className='text-sm'>
                      {patient}
                    </p>
                  ))}
                </td>
                <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row?.method}</td>
                <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row?.category}</td>
                <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row?.car}</td>
                <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row?.member}</td>
                <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row?.remark}</td>
                <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row?.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
