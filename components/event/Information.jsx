/** @format */

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { initialData } from '../../utils/data';
const Information = ({ data, index }) => {
  return (
    <div className='bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between space-y-4 space-x-4 items-center shadow-md hover:shadow-xl duration-200 transition-all ease-linear hover:scale-105'>
      <div className='text-left'>
        <h3 className='font-semibold mb-2 text-main'>{initialData.subtitle}</h3>
        <p className='text-primary-orange font-medium'>{data.label}</p>
        <p className=''>日期：{data.date}</p>
        <p className=''>
          時間：{data.startTime}-{data.endTime}
        </p>
        <p className=''>地點：{data.place}</p>
        <p className=' '>
          地址：
          <Link href={`https://www.google.com/maps/search/?api=1&query=${data.address}`}>
            <a className='link '>{data.address}</a>
          </Link>
        </p>
      </div>
      <Link href={`https://www.google.com/maps/search/?api=1&query=${data.address}`} passHref>
        <div className='relative w-full sm:w-80 h-80 shadow-md rounded-lg link'>
          <Image
            src={`/map${index + 1}.jpg`}
            alt='photo'
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
            priority
          />
        </div>
      </Link>
    </div>
  );
};

export default Information;
