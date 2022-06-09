/** @format */

import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { getStatusColor } from '../../utils/CommonUtils';

const TableColumns = ({ row }) => {
  let className = getStatusColor(row.status.value).toString();
  return (
    <tr>
      <td className='sticky left-0 p-4 bg-white'>
        <Link href={`/report&reportId?=${row.index}`} passHref>
          <svg className='w-5 h-5 link' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            />
          </svg>
        </Link>
      </td>
      <td className='p-4 text-gray-700 whitespace-nowrap'>
        <strong className={`px-3 py-1.5 rounded text-xs font-medium text-center ${className}`}>
          {row.status.name}
        </strong>
      </td>
      <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row.id}</td>
      <td
        className={`p-4 font-medium ${
          row.date === moment().format('YYYY-MM-DD') ? 'text-main' : 'text-gray-900'
        } whitespace-nowrap text-center`}>
        {row.date}
      </td>
      <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row.time}</td>
      <td
        className={`p-4 ${
          row.emergency.value ? 'text-red-700' : 'text-gray-700'
        } whitespace-nowrap text-center`}>
        {row.emergency.name}
      </td>
      <td className='p-4 text-center text-gray-700'>{row.patient}</td>
      <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row.method}</td>
      <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row.category}</td>
      <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row.car}</td>
      <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row.member}</td>
      <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row.remark}</td>
      <td className='p-4 text-center text-gray-700 whitespace-nowrap'>{row.total}</td>
    </tr>
  );
};

export default TableColumns;
