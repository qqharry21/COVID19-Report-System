/** @format */

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { signOut } from 'next-auth/react';
import { isEditor } from '../utils/verifyRoles';

const Header = ({ session }) => {
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
    <div className='relative z-10 flex flex-wrap items-center justify-between p-4 bg-white shadow-md'>
      {/* Left */}
      <div className='flex'>
        {/* Logo */}
        <div className='flex items-center mx-1 text-main'>
          <Link href='/' passHref>
            <div className='relative w-48 h-16 link'>
              <Image src='/logo.gif' alt='logo' layout='fill' objectFit='contain' />
            </div>
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className='md:flex'>
        {/* Navbar */}
        <ul className='items-center hidden space-x-4 font-bold md:flex '>
          {isEditor(session.user.roles) && (
            <Link href='/cans'>
              <a className='flex items-center py-2 link link--outline group'>
                <p className='text-sm md:text-base'>常用罐頭</p>
                <svg
                  className='w-4 h-4 ml-1 md:h-5 md:w-5 md:ml-2 group-hover:text-teal-500'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <polyline points='12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3' />
                  <line x1='12' y1='12' x2='20' y2='7.5' /> <line x1='12' y1='12' x2='12' y2='21' />
                  <line x1='12' y1='12' x2='4' y2='7.5' />
                </svg>
              </a>
            </Link>
          )}
          <Link href='/reports'>
            <a className='flex items-center py-2 link link--outline group'>
              <p className='text-sm md:text-base'>統計資料</p>
              <svg
                className='w-4 h-4 ml-1 md:h-5 md:w-5 md:ml-2 group-hover:text-teal-500'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' /> <line x1='4' y1='19' x2='20' y2='19' />
                <polyline points='4 15 8 9 12 11 16 6 20 10' />
              </svg>
            </a>
          </Link>
          {isEditor(session.user.roles) && (
            <Link href='/add'>
              <a className='flex items-center py-2 link link--outline group'>
                <p className='text-sm md:text-base'>新增案例</p>
                <svg
                  className='w-4 h-4 ml-1 md:h-5 md:w-5 md:ml-2 group-hover:text-teal-500'
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
          )}
          <Link href='/admin'>
            <a className='flex items-center py-2 link link--outline group'>
              <p className='text-sm md:text-base'>設定</p>
              <svg
                className='w-4 h-4 ml-1 md:h-5 md:w-5 md:ml-2 group-hover:text-teal-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <circle cx='12' cy='12' r='3' />
                <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' />
              </svg>
            </a>
          </Link>
          <button
            className='flex items-center py-2 font-medium link link--outline group'
            onClick={signOut}>
            <p className='text-sm md:text-base'>登出</p>
            <svg
              className='w-4 h-4 ml-1 md:h-5 md:w-5 md:ml-2 group-hover:text-teal-500'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path stroke='none' d='M0 0h24v24H0z' />
              <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
              <path d='M7 12h14l-3 -3m0 6l3 -3' />
            </svg>
          </button>
        </ul>
        <button className='flex items-center md:hidden' onClick={() => setIsOpen(prev => !prev)}>
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
          <a className='px-6 py-1 btn btn--outline outline-r'>最新消息</a>
        </Link> */}
        <div className='flex flex-col items-start w-full font-bold lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto'>
          <Link href='/cans'>
            <a className='flex justify-center w-full px-3 py-2 text-black rounded lg:inline-flex lg:w-auto hover:bg-main hover:text-white '>
              常用罐頭
            </a>
          </Link>
          <Link href='/reports'>
            <a className='flex justify-center w-full px-3 py-2 text-black rounded lg:inline-flex lg:w-auto hover:bg-main hover:text-white '>
              統計資料
            </a>
          </Link>
          <Link href='/add'>
            <a className='flex justify-center w-full px-3 py-2 text-black rounded lg:inline-flex lg:w-auto hover:bg-main hover:text-white '>
              新增案例
            </a>
          </Link>
          <Link href='/add'>
            <a className='flex justify-center w-full px-3 py-2 text-black rounded lg:inline-flex lg:w-auto hover:bg-main hover:text-white '>
              新增案例
            </a>
          </Link>
          <Link href='/add'>
            <a className='flex justify-center w-full px-3 py-2 text-black rounded lg:inline-flex lg:w-auto hover:bg-main hover:text-white '>
              新增案例
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
