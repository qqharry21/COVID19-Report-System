/** @format */

import React from 'react';
import { table_column } from '../../utils/data';

const ReportTable = () => {
  return (
    <div className='overflow-x-auto bg-white rounded-lg '>
      <table className='text-sm divide-y divide-gray-500 '>
        <thead>
          <tr>
            <th className='sticky left-0 p-4 text-left bg-white'>
              <label className='sr-only' labelfor='row_all'>
                Select All
              </label>
              <input className='w-5 h-5 border-gray-200 rounded' type='checkbox' id='row_all' />
            </th>
            {table_column.map((column, index) => (
              <th className='p-4 font-medium text-left text-gray-900 whitespace-nowrap' key={index}>
                <div className='flex items-center'>
                  {column.title}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4 ml-1.5 text-gray-700'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='divide-y divide-gray-300'>
          <tr>
            <td className='sticky left-0 p-4 bg-white'>
              <label className='sr-only' labelfor='row_1'>
                Row 1
              </label>
              <input className='w-5 h-5 border-gray-200 rounded' type='checkbox' id='row_1' />
            </td>
            <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>John Doe</td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>john.doe@email.com</td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>
              <strong className='bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-medium'>
                Cancelled
              </strong>
            </td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>(+44) 2198 450650</td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>SHOP-1268-8910</td>
          </tr>

          <tr>
            <td className='sticky left-0 p-4 bg-white'>
              <label className='sr-only' labelfor='row_2'>
                Row 2
              </label>
              <input className='w-5 h-5 border-gray-200 rounded' type='checkbox' id='row_2' />
            </td>
            <td className='p-4 font-medium whitespace-nowrap'>Jane Doe</td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>jane.doe@email.com</td>
            <td className='p-4 whitespace-nowrap'>
              <strong className='bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-medium'>
                Paid
              </strong>
            </td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>(+44) 1928 450650</td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>SHOP-4235-1526</td>
          </tr>

          <tr>
            <td className='sticky left-0 p-4 bg-white'>
              <label className='sr-only' labelfor='row_3'>
                Row 3
              </label>
              <input className='w-5 h-5 border-gray-200 rounded' type='checkbox' id='row_3' />
            </td>
            <td className='p-4 font-medium whitespace-nowrap'>Gary Barlow</td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>gary.barlow@email.com</td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>
              <strong className='bg-amber-100 text-amber-700 px-3 py-1.5 rounded text-xs font-medium'>
                Partially Refunded
              </strong>
            </td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>(+44) 2819 450650</td>
            <td className='p-4 text-gray-700 whitespace-nowrap'>SHOP-1573-2468</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
