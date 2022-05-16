/** @format */

import moment from 'moment';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <Link href='https://haochen.vercel.app/'>
      <a
        className='flex flex-col md:flex-row space-x-4 justify-center items-center text-center p-4 link'
        target='_blank'>
        Hao Harry &copy; {moment().format('YYYY')}
      </a>
    </Link>
  );
};

export default Footer;
