/** @format */

import React from 'react';

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row space-x-4 justify-center items-center text-center p-4'>
      <p className=''>
        <span className='font-medium text-main'>指導單位：</span>
        經濟部中小企業處
      </p>
      <p className=''>
        <span className='font-medium text-main'>主辦單位：</span>
        美商亞德諾半導體股份有限公司、資訊工業策進會
      </p>
    </div>
  );
};

export default Footer;
