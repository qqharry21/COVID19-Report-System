/** @format */

import React, { useState } from 'react';
import { getAge, checkAge } from '../utils/CommonUtils';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import * as easings from 'd3-ease';

const CollapseField = ({ children, data, index, label, title, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [ref, { height: viewHeight }] = useMeasure();
  const { height, display, y } = useSpring({
    config: { duration: 500, easing: easings.easeBackOut },
    from: { height: 0, display: 'none', y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      display: isOpen ? 'grid' : 'none',
      y: isOpen ? 0 : -20,
    },
  });

  return (
    <div
      className={`flex flex-col bg-gray-100 animate__animated animate__bounceIn space-y-2 hover:shadow-lg duration-200 transition-all rounded-lg p-6 ${
        isOpen ? '' : 'shadow-md'
      }`}
      id={`${label}-${index + 1}`}>
      {/* Title */}
      <div
        className='justify-between flex items-center w-full cursor-pointer'
        onClick={() => {
          setIsOpen(prev => !prev);
        }}>
        <button className='flex h-full' type='button'>
          <svg
            className={`h-full w-full text-main ${isOpen ? '' : 'rotate-180'}`}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' />
            <polyline points='6 15 12 9 18 15' />
          </svg>
        </button>
        <h3 className=' text-main font-extrabold'>
          {title} {index + 1}
        </h3>
        <button
          className=' col-span-1 sm:col-span-2 w-fit z-10'
          type='button'
          onClick={handleDelete}>
          <svg
            className='h-5 w-5 text-main hover:text-teal-500'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <polyline points='3 6 5 6 21 6' />
            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
            <line x1='10' y1='11' x2='10' y2='17' />
            <line x1='14' y1='11' x2='14' y2='17' />
          </svg>
        </button>
      </div>
      {/* Alert (患者才需要標記) */}
      {label === 'patient' && checkAge(getAge(data.birth)) ? (
        <div className='col-span-1 sm:col-span-2 space-y-4'>
          <p className='justify-center flex items-center bg-red-500 p-2 text-white rounded-lg w-full sm:w-fit text-xs mx-auto'>
            65歲以上/11歲以下
          </p>
        </div>
      ) : null}
      {/* Content */}
      <animated.div
        className={`grid-cols-1 gap-6 gap-y-4 sm:grid-cols-2 `}
        style={{ display, y, height: isOpen ? 'auto' : height }}
        ref={ref}>
        {children}
      </animated.div>
    </div>
  );
};

export default CollapseField;
