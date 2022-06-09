/** @format */

import Link from 'next/link';
import React from 'react';

const CanCard = ({ title, href, icon }) => {
  return (
    <div className='w-full h-fit'>
      <Link href={href}>
        <a className='relative block h-52 group'>
          <span className='absolute inset-0 border-2 border-teal-500 border-dashed rounded-xl'></span>

          <div className='relative flex items-end h-full transition-transform transform bg-white border-2 border-teal-500 rounded-xl group-hover:-translate-x-2 group-hover:-translate-y-2'>
            <div className='px-8 pb-8 transition-opacity group-hover:opacity-0 group-hover:absolute'>
              {icon}

              <h2 className='mt-4 text-xl font-medium'>{title}</h2>
            </div>

            <div className='absolute p-8 transition-opacity opacity-0 group-hover:opacity-100 group-hover:relative '>
              <h2 className='mt-4 text-3xl font-medium text-main'>{title}</h2>

              <p className='mt-8 text-md font-base'>建立</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CanCard;
