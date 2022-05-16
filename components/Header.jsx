/** @format */

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isBigScreen = useMediaQuery({
    query: '(min-width: 640px)',
  });
  useEffect(() => {
    if (isBigScreen) {
      setIsOpen(false);
    }
  }, [isBigScreen]);
  return (
    <div className='p-4 flex-wrap justify-between flex items-center bg-white relative shadow-lg z-10'>
      {/* Left */}
      <div className='flex'>
        {/* Logo */}
        <div className='mx-1 text-main items-center flex'>
          <Link href='/' passHref>
            <div className='relative w-48 h-16 link'>
              <Image src='/logo.gif' alt='logo' layout='fill' objectFit='contain' />
            </div>
          </Link>
          <Link href='/' passHref>
            <h1 className='ml-1 text-2xl md:text-3xl link font-semibold hidden md:flex'>
              新竹市消防局確診通報系統
            </h1>
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className='md:flex'>
        {/* Navbar */}
        <ul className='hidden md:flex items-center space-x-4 font-bold '>
          {/* <Link href='/news'>
            <a className='link--outline link py-2 text-sm md:text-base'>最新消息</a>
          </Link> */}
          <Link href='/report'>
            <a className='link--outline link py-2 text-sm md:text-base'>統計資料</a>
          </Link>
          <Link href='/add'>
            <a className='link link--outline py-2 items-center group flex'>
              <p className='text-sm md:text-base'>新增案例</p>
              <svg
                className='h-4 md:h-5 w-4 md:w-5  ml-1 md:ml-2 group-hover:text-teal-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                <circle cx='8.5' cy='7' r='4' /> <line x1='20' y1='8' x2='20' y2='14' />
                <line x1='23' y1='11' x2='17' y2='11' />
              </svg>
            </a>
          </Link>
        </ul>
        <button className='items-center flex md:hidden' onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? (
            <svg className='icon-btn' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg className='icon-btn' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          )}
        </button>
      </div>
      {/* Dropdown */}
      <div className={`${isOpen ? '' : 'hidden'} w-full  lg:flex-grow lg:w-auto`}>
        {/* <Link href='/'>
          <a className='btn btn--outline outline-r px-6 py-1'>最新消息</a>
        </Link> */}
        <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto font-bold'>
          <Link href='/events'>
            <a className='lg:inline-flex lg:w-auto w-full justify-center flex text-black rounded hover:bg-main hover:text-white  px-3 py-2'>
              活動議程
            </a>
          </Link>
          <Link href='/signup'>
            <a className='lg:inline-flex lg:w-auto w-full justify-center flex text-black rounded hover:bg-main hover:text-white  px-3 py-2'>
              我要報名
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
