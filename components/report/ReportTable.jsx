/** @format */

import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { table_column } from '../../utils/data';
const ReportTable = ({ data }) => {
  return (
    <div className='overflow-x-auto bg-white rounded-lg py-2'>
      <table className=' min-w-full text-sm divide-y divide-gray-500 table-auto'>
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
          {data?.map((row, index) => (
            <Link key={index} passHref href='/'>
              <tr className='cursor-pointer hover:bg-gray-100 duration-200 ease-in'>
                <td className='sticky left-0 p-4 bg-white'>
                  <Link href={`/report/search?reportId=${row.id}`} passHref>
                    <svg
                      className='h-5 w-5 link'
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
                    className={`px-3 py-1.5 rounded text-xs font-medium text-center ${
                      row.status.value === 1
                        ? 'bg-[#fce8b2] text-orange-700'
                        : row.status.value === 2
                        ? 'bg-[#b7e1cd] text-green-700'
                        : row.status.value === 3
                        ? 'bg-[#e5b8ae] text-red-700'
                        : row.status.value === 4
                        ? 'bg-[#d9d2e9] text-purple-700'
                        : ''
                    }`}>
                    {row.status.name}
                  </strong>
                </td>
                <td className='p-4 text-gray-700 whitespace-nowrap text-center'>{row.id}</td>
                <td
                  className={`p-4 font-medium ${
                    row.date === moment().format('YYYY-MM-DD') ? 'text-main' : 'text-gray-900'
                  } whitespace-nowrap text-center`}>
                  {row.date}
                </td>
                <td className='p-4 text-gray-700 whitespace-nowrap text-center'>{row.time}</td>
                <td
                  className={`p-4 ${
                    row.emergency.value ? 'text-red-700' : 'text-gray-700'
                  } whitespace-nowrap text-center`}>
                  {row.emergency.name}
                </td>
                <td className='p-4 text-gray-700 text-center w-[88px] flex justify-center'>
                  {row.patient}
                </td>
                <td className='p-4 text-gray-700 whitespace-nowrap text-center'>{row.method}</td>
                <td className='p-4 text-gray-700 whitespace-nowrap text-center'>{row.category}</td>
                <td className='p-4 text-gray-700 whitespace-nowrap text-center'>{row.car}</td>
                <td className='p-4 text-gray-700 whitespace-nowrap text-center'>{row.member}</td>
                <td className='p-4 text-gray-700 whitespace-nowrap text-center'>{row.remark}</td>
                <td className='p-4 text-gray-700 whitespace-nowrap text-center'>{row.total}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
